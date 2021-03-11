import fs from "fs";
import WindowsCELibrary from "./WindowsCELibrary";
import path from "path";
import util from "util";
import WinCEFileSorter from "./WinCEFileSorter";

function inspect(obj: any) {
    console.log(util.inspect(obj, false, null, true /* enable colors */));
}

function parseFolder(directory: string, dirFunction: (dir: string) => any) {
    if (!fs.existsSync(directory)) throw new Error(`Directory "${directory}" does not exist`);

    let dirs = fs.readdirSync(directory).map(item => path.join(directory, item)).filter(item => fs.lstatSync(item).isDirectory());

    dirs.forEach(title => {
        console.log(`\nProcessing ${title}`)
        //inspect(WindowsCELibrary.getTitle(title));
        dirFunction(title);
    });
}

//parseFolder("/mnt/c/Users/Thomas/Desktop/CE1 sorted", WindowsCELibrary.getTitle);
parseFolder("/mnt/c/Users/Thomas/Desktop/CE Stuff/Unsorted software", WinCEFileSorter.processDirectory);