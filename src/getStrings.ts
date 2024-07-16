import { spawn } from "child_process";
import fs from "fs";

export default function getStrings(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath))
            reject(`File "${filePath}" does not exist`);
        const strings = spawn('strings', ['-el', '-Tpe-x86-64', '-d', filePath]);
        var output = "";
        strings.stdout.setEncoding("utf-8");

        strings.stdout.on('data', function (data) {
            output += data.toString();
        });

        strings.on('close', function (code) {
            if (code) {
                reject(output);
            } else {
                let strings: string[] = output.split('\n').map(item => item.trim());
                resolve(strings);
            }
        });
    });
}
