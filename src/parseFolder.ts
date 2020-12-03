import fs from "fs";
import WindowsCELibrary from "./WindowsCELibrary";
import path from "path";
import util from "util";

function inspect(obj: any) {
    console.log(util.inspect(obj, false, null, true /* enable colors */));
}

function parseFolder(directory: string) {
    if (!fs.existsSync(directory)) throw new Error(`Directory "${directory}" does not exist`);

    let dirs = fs.readdirSync(directory).map(item => path.join(directory, item)).filter(item => fs.lstatSync(item).isDirectory());

    dirs.forEach(title => {
        console.log(`\nProcessing ${title}`)
        //inspect(WindowsCELibrary.getTitle(title));
        WindowsCELibrary.getTitle(title);
    });
}

parseFolder("/mnt/c/Users/Thomas/Desktop/CE1 sorted");