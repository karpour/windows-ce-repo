import { spawn } from "child_process";
import fs from "fs";

export default function extractCab(filePath: string, extractDir: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            reject(`Directory "${filePath}" does not exist`);
            return;
        }
        const cabextract = spawn('cabextract', ['-d', extractDir, filePath]);
        var errMessage = "";
        cabextract.stderr.setEncoding("ascii");

        cabextract.stderr.on('data', function (data) {
            errMessage += data.toString();
        });

        cabextract.on('close', function (code) {
            if (code) {
                reject(errMessage);
            } else {
                resolve(extractDir);
            }
        });
    });
}
