import { WinCEPEInfo } from "./types/WinCEPEInfo";
import { spawn } from "child_process";
import fs from "fs";

export default async function getWinCEPEInfo(filePath: string): Promise<WinCEPEInfo> {
    if (!fs.existsSync(filePath)) throw new Error(`File "${filePath}" does not exist`);
    return new Promise((resolve, reject) => {
        const wcepeinfo = spawn('./wcepeinfo', ['-j', filePath]);
        var wceData = "";
        wcepeinfo.stdout.setEncoding("ascii");

        wcepeinfo.stdout.on('data', function (data) {
            wceData += data.toString();
        });

        wcepeinfo.on('close', function (code) {
            let info: WinCEPEInfo = JSON.parse(wceData);
            resolve(info);
        });
    });
}




getWinCEPEInfo('./htmledit.exe').then(res => console.log(res));
