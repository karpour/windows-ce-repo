/**
 * Does some preprocessing and sorts files
 */

import os from 'os';
import path from 'path';

const TMP_DIR = os.tmpdir();

const RegExp_Directory_Version = /^(.+)\sv?(\d+\.\d+\w*)$/;

export default abstract class WinCEFileSorter {
    public static processDirectory(directoryPath: string) {
        let name:string = path.basename(directoryPath);
        let version:string|undefined;
        
        console.log(`Processing ${path.basename(directoryPath)}`);
        
        let versionRegExp: RegExpExecArray | null;
        if (versionRegExp = RegExp_Directory_Version.exec(path.basename(directoryPath))) {
            console.log(`Version ${versionRegExp[2]}`)
            name = versionRegExp[1];
            version = versionRegExp[2];
        }


        
    }

}