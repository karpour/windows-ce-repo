import { WinCEPEInfo } from "./types/WinCEPEInfo";
import path from "path";
import { WinCeCab000Header } from "./types/WinCeCab000Info";
import inspect from "./inspect";
import getCabFileInfo from "./getCabFileInfo";
import fs from "fs";

async function main() {
    const dir = "/mnt/c/Users/Thomas/Desktop/cabs/";
    const cabs = fs.readdirSync(dir).filter(item => item.toLowerCase().endsWith(".cab"));

    for (let cab of cabs) {
        console.log(`${cab}`);
        let c = await getCabFileInfo(path.join(dir, cab));
        console.log(`  ${c.cabHeader.provider} ${c.cabHeader.appName} [${c.cabHeader.architecture}]${c.cabHeader.minCeVersion ? ` (${c.cabHeader.minCeVersion?.stringValue})` : ''}`);

    }
}

main();