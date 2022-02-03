import { spawn } from "child_process";
import { WinCeCab000Header } from "./types/WinCeCab000Info";
import fs from "fs";

export default function getWinCeCabInfo(filePath: string): Promise<WinCeCab000Header> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath))
            reject(`File "${filePath}" does not exist`);
        const wcepeinfo = spawn('wcecabinfo', ['-j', filePath]);
        //console.log(['wcecabinfo', '-j', filePath].join(' '));
        var wceData = "";
        var errData = "";
        wcepeinfo.stdout.setEncoding("utf-8");
        wcepeinfo.stderr.setEncoding("utf-8");

        wcepeinfo.stderr.on('data', function (data) {
            errData += data.toString();
        });
        wcepeinfo.stdout.on('data', function (data) {
            wceData += data.toString();
        });

        wcepeinfo.on('close', function (code) {
            if (code) {
                //console.log(`Code is ${code}`);
                //console.log(errData);
                //console.log(wceData);
                reject(wceData);
            } else {
                try {
                    let info: WinCeCab000Header = JSON.parse(wceData);
                    resolve(info);
                } catch (e: any) {
                    console.error("Failed to parse wcecabinfo JSON:\n" + wceData);
                    reject("Failed to parse JSON:");
                }
            }
        });
    });
}
