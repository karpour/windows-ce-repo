import { WindowsCEPEInfo } from "./types/WindowsCEPEInfo";
import { spawn } from "child_process";
import fs from "fs";


export default function getWinCeCabFileList(filePath: string) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath))
            reject(`File "${filePath}" does not exist`);
        const wcepeinfo = spawn('wcepeinfo', ['-j', filePath]);
        var wceData = "";
        wcepeinfo.stdout.setEncoding("ascii");

        wcepeinfo.stdout.on('data', function (data) {
            wceData += data.toString();
        });

        wcepeinfo.on('close', function (code) {
            if (code) {
                reject(wceData);
            }
            let info: WindowsCEPEInfo = JSON.parse(wceData);
            resolve(info);
        });
    });
}
