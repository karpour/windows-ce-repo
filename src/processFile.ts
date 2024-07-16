import path, { basename, extname } from "path";
import getWinCeCabInfo from "./getWinCeCabInfo";
import { existsSync, readdirSync, renameSync } from "fs";
import makeTempDir from "./makeTempDir";
import extractCab from "./extractCab";
import { extractExe } from "./extractExe";
import getStrings from "./getStrings";
import { parseRarFileName } from "./parseRarNames";
import getWinCePEInfo from "./getWinCEPEInfo";

type AppInfoPart = {
    source: string,
    sourceContext?: string,
    version?: string,
    developer?: string,
    email?: string,
    url?: string,
    appname?: string,
    platform?: string[],
    date?: string,
    arch?: string[];
    ceVersion?: string;
    strings?: string[],
};

function readDirAbsolute(dirPath: string) {
    return readdirSync(dirPath).map(f => path.join(dirPath, f));
}

export async function processFile(filePath: string): Promise<AppInfoPart[]> {
    if (!existsSync(filePath)) return [];
    const filename = basename(filePath);
    const ext = extname(filename).toLowerCase();
    switch (ext) {
        case '.exe':
            return processExe(filePath);
        case '.cab':
            return processCab(filePath);
        case '.zip':
        case '.rar':
        case '.lzh':
            return processArchive(filePath);
        default:
            //console.log(`No handler for ${ext}`);
            return [];
    }
}

async function processCab(filePath: string): Promise<AppInfoPart[]> {
    const cabInfo = await getWinCeCabInfo(filePath);

    const appInfo: AppInfoPart[] = [];
    appInfo.push({
        source: `CAB File: ${basename(filePath)}`,
        appname: cabInfo.appName,
        developer: cabInfo.provider,
    });

    const tempDir = makeTempDir();
    await extractCab(filePath, tempDir);
    //console.log(cabInfo);
    const cabFiles = readDirAbsolute(tempDir);

    // Cab files contain .exe files and also sometimes .htp files
    if (cabInfo.files) {
        for (let fileInfo of cabInfo.files) {
            let f = cabFiles.find(fileName => parseInt(extname(fileName).substring(1, 4)) === fileInfo.id);
            if (!f) throw new Error(`No matching file for id ${fileInfo.id} found`);
            console.log(`${f} => ${path.join(tempDir, fileInfo.name)}`);
            renameSync(f, path.join(tempDir, fileInfo.name));
        }
    }

    const renamedFiles = readDirAbsolute(tempDir);
    console.log(renamedFiles);

    const firstExe = renamedFiles.find(f => extname(f) === ".exe");
    if (firstExe) {
        appInfo.push(...(await processExe(firstExe)));
    }

    return appInfo;
}

async function processExe(filePath: string): Promise<AppInfoPart[]> {
    try {
        const peInfo = await getWinCePEInfo(filePath);

        const appInfo: AppInfoPart[] = [];
        let exeInfo: AppInfoPart = {
            source: `EXE file: ${basename(filePath)}`,
            date: peInfo.Date,
        };
        if (peInfo.versionInfo?.CompanyName) exeInfo.developer = peInfo.versionInfo.CompanyName;
        if (peInfo.versionInfo?.ProductName) exeInfo.appname = peInfo.versionInfo.ProductName;
        if (peInfo.versionInfo?.ProductVersion) exeInfo.version = peInfo.versionInfo.ProductVersion;
        else if (peInfo.versionInfo?.FileVersion) exeInfo.version = peInfo.versionInfo.FileVersion;
        exeInfo.strings = await getStrings(filePath);

        if (exeInfo.strings) {
            let url = findUrl(`EXE file strings: ${basename(filePath)}`, exeInfo.strings);
            if (url) appInfo.push(url);
        }

        if (peInfo.WCEApp) {
            exeInfo.arch = [peInfo.WCEArch];
            exeInfo.ceVersion = peInfo.WCEVersion;
        } else {
            const tempDir = makeTempDir();

            try {
                await extractExe(filePath, tempDir);
            } catch (err) {

            }
        }

        appInfo.push(exeInfo);
        return appInfo;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function processArchive(filePath: string): Promise<AppInfoPart[]> {
    const info = await parseRarFileName(basename(filePath, extname(filePath)));
    console.log(info);
    return [];
}

function findUrl(source: string, strings: string[]): AppInfoPart | undefined {
    for (let str of strings) {
        const r = /(?:^| )(?:http:\/\/www\.|http:\/\/|www\.)[^\.\s]+\.[a-z]{2,3}[^\s]*/.exec(str);
        if (r) {
            return {
                source: source,
                sourceContext: str,
                url: r[0]
            };
        }
    }
}

async function main() {
    const dir = `/mnt/c/Users/Thomas/Desktop/trash`;
    let files = readDirAbsolute(dir).filter(f => extname(f).toLowerCase() === '.exe');
    for (let file of files) {
        console.log(file);
        const appInfo = await processFile(file);
        console.log(appInfo);
    }
}

main();