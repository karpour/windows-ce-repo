import fs from "fs";
import path from "path";
import util from "util";
import { WindowsCEArchitecture, WindowsCEArchitectures } from "./types/WindowsCEArchitecture";
import { WindowsCECoreVersion, WindowsCECoreVersions } from "./types/WindowsCECoreVersion";
import { DeviceTypeMap, WindowsCEDeviceType, WindowsCEDeviceTypeExtended} from "./types/WindowsCEDeviceType";
import {
    META_JSON_NAME,
    TitleScreenshot,
    WindowsCETitle,
    WindowsCETitleFiles,
    WindowsCETitleFilesType,
    WindowsCETitleMeta,
    WindowsCETitleVersion,
    WindowsCETitleVersions,
} from "./types/WindowsCELibraryTypes";


const RegExp_Version_Directory = /v\d+\.\d+.*/;

const RegExp_CE_Version_Directory = /CE(\d\.\d\d?)(.*)/;

const arches: { [key: string]: WindowsCEArchitecture; } = {};
for (let arch of WindowsCEArchitectures) {
    arches[arch.toUpperCase()] = arch as WindowsCEArchitecture;
}

//console.log(arches);


export default class WindowsCELibrary {
    private static validArchStringsUpperCase: string[] = WindowsCEArchitectures.map(arch => arch.toUpperCase());

    static createEmptyTitleMeta(): WindowsCETitleMeta {
        return {
            title: "",
            titleLong: "",
            platform: "Windows CE",
            developer: "",
            publisher: "",
            cost: 0,
            costCurrency: "",
            hideDeveloperFromTitle: false,
            categories: [],
            license: "",
            successorOf: "",
            description: "",
            tags: [],
            releaseDate: "",
            languages: [],
            website: "",
            archivedWebsite: "",
        };
    }

    static getMeta(directory: string): WindowsCETitleMeta {
        let metaPath = path.join(directory, META_JSON_NAME);
        let meta = WindowsCELibrary.createEmptyTitleMeta();
        if (fs.existsSync(metaPath)) {
            let readMeta = JSON.parse(fs.readFileSync(metaPath).toString());
            meta = Object.assign(meta, readMeta);
        } else {
            console.log(`Writing new meta file ${metaPath}`);
            fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
        }
        return meta;
    }

    static getScreenshots(baseDirectory: string, subDirectory: string = ""): string[] {
        let directory = path.join(baseDirectory, subDirectory);
        const validScreenshotExtensions = [".jpg", ".gif", ".png", ".bmp"];
        if (!fs.existsSync(directory)) return []; // throw new Error(`Path ${directory} does not exist`);
        if (!fs.lstatSync(directory).isDirectory()) return []; //throw new Error(`Path ${directory} is not a directory`);
        //console.log("Screenshot dir " + directory);
        //console.log(fs.readdirSync(directory).map(fileName => path.extname(fileName).toLowerCase()));
        return fs.readdirSync(directory)
            .filter(fileName => validScreenshotExtensions.includes(path.extname(fileName).toLowerCase()))
            .map((fileName => path.join(subDirectory, fileName)));
    }

    static getTitle(directoryPath: string): WindowsCETitle {
        // Check if path exists
        if (!fs.existsSync(directoryPath)) throw new Error(`Path "${directoryPath} does not exist"`);
        // Check if path is a directory
        if (!fs.lstatSync(directoryPath).isDirectory()) throw new Error(`Path "${directoryPath} is not a directory"`);

        let filesList = fs.readdirSync(directoryPath);
        //console.log(filesList);

        let versions: WindowsCETitleVersions = {};

        let fileMeta: WindowsCETitleMeta | undefined = undefined;

        let screenshots: TitleScreenshot[] = WindowsCELibrary.getScreenshots(directoryPath, "screenshots").map(screenshot => ({ path: screenshot }));

        let readmeTxt = undefined;
        for (let fileName of filesList) {
            let fileFullPath = path.join(directoryPath, fileName);

            // Check for english Readme
            if (fileName.toUpperCase() == "README.TXT" && fs.lstatSync(fileFullPath).isFile()) {
                //readmeTxt = fs.readFileSync(path.join(directoryPath, fileName)).toString();
                readmeTxt = fileName;
            }

            if (fileName.toUpperCase() == "INDEX.JSON" && fs.lstatSync(fileFullPath).isFile()) {
                //readmeTxt = fs.readFileSync(path.join(directoryPath, fileName)).toString();
                fileMeta = JSON.parse(fs.readFileSync(fileFullPath).toString());

            }

            else if (RegExp_Version_Directory.test(fileName)) {
                //console.log(`Found version ${fileName}`);
                versions[fileName] = WindowsCELibrary.getVersion(fileFullPath);
                screenshots = screenshots.concat(WindowsCELibrary.getScreenshots(directoryPath, path.join(fileName, "screenshots")).map(screenshot => ({ path: screenshot, version: fileName })));
            }
        }
        // check for Readme


        let windowsCETitle: WindowsCETitle = {
            meta: WindowsCELibrary.getMeta(directoryPath),
            readme: readmeTxt,
            versions: versions,
            screenshots: screenshots
        };

        if (Object.keys(versions).length == 0) {
            console.error("No versions");
        }

        return windowsCETitle;
    }

    static getVersion(directoryPath: string): WindowsCETitleVersion {
        let filesList = fs.readdirSync(directoryPath);
        let readmeTxt = undefined;

        let titleFiles: WindowsCETitleFiles[] = [];


        for (let fileName of filesList) {
            let regExpResult: RegExpExecArray | null = null;

            let deviceTypes: WindowsCEDeviceType[] = [];

            let addDeviceType = (deviceType: WindowsCEDeviceType) => {
                if (!deviceTypes.includes(deviceType))
                    deviceTypes.push(deviceType);
            };

            // Check for english Readme
            if (fileName.toUpperCase() == "README.TXT" && fs.lstatSync(path.join(directoryPath, fileName)).isFile()) {
                //readmeTxt = fs.readFileSync(path.join(directoryPath, fileName)).toString();
                readmeTxt = fileName;
            }

            else if (regExpResult = RegExp_CE_Version_Directory.exec(fileName)) {
                let ceVersion = regExpResult[1] as WindowsCECoreVersion;
                ceVersion = ceVersion.replace("00", "0") as WindowsCECoreVersion;
                if (!WindowsCELibrary.isValidCEVersion(ceVersion)) throw new Error(`Invalid Windows CE version "${fileName}"`);

                if (ceVersion == "1.0" || ceVersion == "1.01" || ceVersion == "2.0" || ceVersion == "4.0" || ceVersion == "4.10") {
                    addDeviceType("HPC");
                }

                if (ceVersion == "2.01") {
                    addDeviceType("PPC");
                }

                if (regExpResult[2]) {
                    let deviceTypesFromFolderName = regExpResult[2].trim().split(/\s+/).map(val => val.trim().toUpperCase());
                    deviceTypesFromFolderName.forEach(dType => {
                        let d = DeviceTypeMap[dType as WindowsCEDeviceTypeExtended];
                        if (d) {
                            addDeviceType(d);
                        } else {
                            console.log(deviceTypesFromFolderName);
                            throw new Error(`Invalid device type "${dType}" in name ${fileName}`);
                        }
                    });
                }

                if (deviceTypes.length == 0) console.error("No device Type");

                titleFiles = titleFiles.concat(WindowsCELibrary.getAllTitleFiles(path.join(directoryPath, fileName), ceVersion));
            }

        }
        if (titleFiles.length == 0) console.warn(`No title files in "${directoryPath}"`);
        let version: WindowsCETitleVersion = {
            files: titleFiles,
            readme: readmeTxt,
            meta: undefined
        };

        return version;
    }

    static isValidCEVersion(version: string) {
        return WindowsCECoreVersions.includes(version as WindowsCECoreVersion);
    }

    static getAllTitleFiles(directoryPath: string, ceVersion: WindowsCECoreVersion): WindowsCETitleFiles[] {
        //console.log(`  Getting all title files for path ${directoryPath}`);
        let filesList = fs.readdirSync(directoryPath).filter(tpath => fs.lstatSync(path.join(directoryPath, tpath)).isDirectory());
        return filesList.map(fileName => WindowsCELibrary.getTitleFiles(path.join(directoryPath, fileName), ceVersion));
    }

    static getTitleFiles(directoryPath: string, ceVersion: WindowsCECoreVersion): WindowsCETitleFiles {
        let dirName = path.basename(directoryPath);
        let parts = dirName.split('_');
        let type: WindowsCETitleFilesType = "setup";
        let isSetup = false;

        let architectures: WindowsCEArchitecture[] = [];
        for (let part of parts) {
            let arch = undefined;
            //console.log(`Checking part ${part}`);
            if (arch = WindowsCELibrary.getArch(part)) {
                architectures.push(arch);
            } else if (part == "SETUP") {
                isSetup = true;
            } else if (part == "SRC") {
                type = "source";
            } else {
                throw new Error(`Invalid part "${part}" in dir name ${directoryPath}`);
            }
        }

        let files = WindowsCELibrary.getRecursiveFilesList(directoryPath);

        if (!isSetup) {
            // TODO check exe and cabs
        }

        let titleFiles: WindowsCETitleFiles = {
            ceVersion: ceVersion,
            architectures: architectures,
            files: files,
            type: type,
        };


        //console.log(titleFiles);
        return titleFiles;
    }

    static getArch(arch: string): WindowsCEArchitecture | undefined {
        return arches[arch.toUpperCase()];
    }

    static isValidArch(arch: string) {
        return WindowsCELibrary.validArchStringsUpperCase.includes(arch.toUpperCase());
    }

    static getRecursiveFilesList(directoryPath: string, baseDir: string = ""): string[] {
        //console.log(`getRecursiveFilesList ${directoryPath}`);
        let files: string[] = [];
        let filesList = fs.readdirSync(path.join(directoryPath, baseDir));
        for (let fileName of filesList) {
            if (fs.lstatSync(path.join(directoryPath, baseDir, fileName)).isFile()) {
                //console.log(`File ${fileName}`);
                files.push(fileName);
            } else {
                files.concat(WindowsCELibrary.getRecursiveFilesList(path.join(directoryPath, baseDir), fileName));
            }
        }
        //console.log(files);
        return files;
    }
}

//console.log(util.inspect(WindowsCELibrary.getTitle("/mnt/c/Users/Thomas/Desktop/CE1 sorted/Wodeon MPEG Player"), false, null, true /* enable colors */));