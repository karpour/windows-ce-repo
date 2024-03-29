import makeTempDir from "./makeTempDir";
import fs from "fs";
import path from "path";
import getWinCePEInfo from "./getWinCePEInfo";
import getStrings from "./getStrings";
import getWinCeCabInfo from "./getWinCeCabInfo";
import extractCab from "./extractCab";
import { WinCeCab000Header } from "./types/WinCeCab000Info";
import { WindowsCEPEInfo } from "./types/WindowsCEPEInfo";

export function getFileNumber(file: string) {
    return parseInt(path.extname(file).replace(".", ""));
}

export type CabFileInfo = {
    cabHeader: WinCeCab000Header;
    peInfos: {
        file: string;
        peInfo: WindowsCEPEInfo;
        strings: string[];
    }[];
    files: { [key: number]: string; };
};


export default async function getCabFileInfo(filepath: string): Promise<CabFileInfo> {
    //console.log(`Processing ${filepath}`);

    /** Temporary directory to extract cab contents to */
    const tempDir: string = makeTempDir();
    await extractCab(filepath, tempDir);
    let cabFiles: string[] = fs.readdirSync(tempDir);

    const cab000Info = await getWinCeCabInfo(filepath);

    const cabInfo: CabFileInfo = {
        cabHeader: cab000Info,
        peInfos: [],
        files: {},
    };
    cabFiles.forEach(file => {
        cabInfo.files[getFileNumber(file)] = file;
    });

    for (let file of cabFiles) {
        try {
            const fileFullPath = path.join(tempDir, file);
            const info = await getWinCePEInfo(fileFullPath);
            cabInfo.peInfos.push({
                file: file,
                peInfo: info,
                strings: await getStrings(fileFullPath)
            });
        } catch (e: any) {
            //console.log("Error");
        }
    };

    fs.rmSync(tempDir, { recursive: true, force: true });

    return cabInfo;
}
