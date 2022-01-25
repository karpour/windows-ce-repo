import { WinCEPEInfo } from "./types/WinCEPEInfo";
import { spawn } from "child_process";
import fs from "fs";

export default function getWinCePEInfo(filePath: string): Promise<WinCEPEInfo> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) reject(`File "${filePath}" does not exist`);
        const wcepeinfo = spawn('wcepeinfo', ['-j', filePath]);
        let cmd = `wcepeinfo -j ${filePath}`;
        var wceData = "";
        var errData = "";
        wcepeinfo.stdout.setEncoding("ascii");
        wcepeinfo.stderr.setEncoding("ascii");

        wcepeinfo.stdout.on('data', function (data) {
            wceData += data.toString();
        });
        wcepeinfo.stderr.on('data', function (data) {
            errData += data.toString();
        });

        wcepeinfo.on('close', function (code) {
            wceData = wceData.replace(/\n/g, '');
            //console.error(`${cmd} (exited with code ${code})`);
            if (code === null || code !== 0) {
                reject(wceData);
            } else {
                try {
                    let info: WinCEPEInfo = JSON.parse(wceData);
                    resolve(info);
                } catch (e: any) {
                    console.error(`Failed to parse wcepeinfo JSON`);
                    console.error(e);
                    console.error(`stdout: \n${wceData}`);
                    console.error(`stderr: \n${errData}`);
                    reject(`Failed to parse JSON`);
                }
            }
        });
    });
}
