import { spawn } from "child_process";
import fs from "fs";

export default function extractCab(filePath: string, extractDir: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            reject(`Directory "${filePath}" does not exist`);
            return;
        }
        const wcepeinfo = spawn('cabextract', ['-d', extractDir, filePath]);
        var errMessage = "";
        wcepeinfo.stderr.setEncoding("ascii");

        wcepeinfo.stderr.on('data', function (data) {
            errMessage += data.toString();
        });

        wcepeinfo.on('close', function (code) {
            if (code) {
                reject(errMessage);
            } else {
                resolve(extractDir);
            }
        });
    });
}
