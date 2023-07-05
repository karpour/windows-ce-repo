import fs from "fs";
import path, { parse } from "path";
import { createExtractorFromFile } from "node-unrar-js";
import { WindowsCEDeviceType } from "./types/WindowsCEDeviceType";
import { WindowsCeVersionName, WindowsCeVersionNames } from "./types/WindowsCECoreVersion";
import { WindowsCEArchitecture } from "./types/WindowsCEArchitecture";

const RegExp_Regged = /[\. _]regged/i;
const RegExp_Cracked = /[\. _]cr[4a]cked/i;
/**
 Incl Keygen
 KeyGen
 Keygen
.Incl.KeyMaker
.Incl.Keyfile
.Incl.Keygen
.Incl.Keymaker
.Incl.keygen
.Keygen
.Keymaker
.incl.Keygen
.incl.Keymaker
.incl.keygen
.keygen
_KEYGEN
 */
const RegExp_KeyGen = /(?:[\. _]incl)?[\. _]key(?:gen|file|maker|filemaker|(?=[\. _]))/i;
// -ShareFree
// -aSxPDA
// -RCAPDA
// -COREPDA
// -BLZPDA
// .by.Incognito
// .by.Slay
// .by.Tyra
// .by.pdateam
// .by.Volod
// .by.Slay.of.Inpocket
const RegExp_Group = /-[a-zA-Z0-9]{2,}(?:-[a-zA-Z]+)?$|.by.[a-zA-Z0-9]+(?:.of.[a-zA-Z0-9]+)?$/i;

const RegExp_Version = /[ \._](?:[vV][ \._]?)?(?<major>\d{1,3})(?:\.(?<minor>\d{1,4})(?:\.(?<patch>\d{1,3})(?:\.(?<minorPatch>\d{1,3}))?)?)/;
const RegExp_Version2 = /(?:[vV][ \._]?)(?<major>\d{1,3})/;

// ALL
// ARM

const RegExp_Architectures: { regExp: RegExp, arches: WindowsCEArchitecture[]; }[] = [
    {
        regExp: /[\. _]ALL|[\. _]All$/,
        arches: ["ARM", "MIPS", "SH3"]
    },
    {
        regExp: /[\. _]ARM/i,
        arches: ["ARM"]
    },
    {
        regExp: /[\. _]MIPS/i,
        arches: ["MIPS"]
    },
    {
        regExp: /[\. _]SH3/i,
        arches: ["SH3"]
    },
    {
        regExp: /[\. _]XSCALE/i,
        arches: ["XSCALE"]
    }
];


const RegExp_DeviceTypes: { regExp: RegExp, deviceType?: WindowsCEDeviceType, ceVersion?: WindowsCeVersionName; }[] = [
    {
        regExp: /[\. _]wm6/i,
        ceVersion: "WM6",
        deviceType: "PPC"
    },
    {
        regExp: /[\. _-]wm(:?200)?5/i,
        ceVersion: "WM5",
        deviceType: "PPC"
    },
    {
        regExp: /[\. _]wm200[3x]|.winmobile.2003/i,
        ceVersion: "WM2003",
        deviceType: "PPC"
    },
    {
        regExp: /[\. _]PPC2002/i,
        ceVersion: "PPC2002",
        deviceType: "PPC"
    },
    {
        regExp: /(?:[\. _]FOR)?[\. _]PPC/i,
        deviceType: "PPC"
    },
    {
        regExp: /(?:[\. _]FOR)?[\. _]HPC/i,
        deviceType: "HPC"
    },
];
// FOR PPC
// PPC
// PPC2002
// WM200x
// WM200X
// WM2003
// WM2005
// WM5
// WM6


async function main() {
    const dir = "/mnt/d/oldhandhelds.com/Pocket\ Pc\ Software/Unsorted/";
    let files = fs.readdirSync(dir)
        .filter(f => f.toLowerCase().endsWith(".rar"));
    //.map(file => path.basename(file, ".rar"));
    //.map(file => file.replace(/(?:\.|_)/g, ' '));


    for (let f of files) {
        await getRarFileInfo(path.join(dir, f));
    }
}


export type RarFileInfo = {
    regged?: boolean;
    cracked?: boolean;
    keygen?: boolean;
    company?: string;
    architectures: WindowsCEArchitecture[];
    name: string;
    deviceTypes: WindowsCEDeviceType[];
    ceVersion?: WindowsCeVersionName;
    version?: {
        major: number;
        minor?: number;
        patch?: number;
        minorPatch?: number;
        fullVersion: string;
    };
};

export function parseRarFileName(name: string) {
    const rarFileInfo: RarFileInfo = {
        //regged: false,
        //cracked: false,
        //keygen: false,
        architectures: [],
        company: undefined,
        deviceTypes: [],
        name: "",
    };

    const addArches = (arches: WindowsCEArchitecture[]) => {
        for (let arch of arches) {
            if (!rarFileInfo.architectures.includes(arch)) {
                rarFileInfo.architectures.push(arch);
            }
        }
    };

    // Get version
    let r: RegExpExecArray | null;
    if (r = RegExp_Version.exec(name)) {
        rarFileInfo.version = {
            fullVersion: r[0].replace(/^.v?/, ''),
            major: parseInt(r[1]),
        };
        if (r[2] != undefined) rarFileInfo.version.minor = parseInt(r[2]);
        if (r[3] != undefined) rarFileInfo.version.patch = parseInt(r[3]);
        if (r[4] != undefined) rarFileInfo.version.minorPatch = parseInt(r[4]);
        name = name.replace(RegExp_Version, '');
    } else if (r = RegExp_Version2.exec(name)) {
        rarFileInfo.version = {
            major: parseInt(r[1]),
            fullVersion: r[0].replace(/^.v?/, '')
        };
        name = name.replace(RegExp_Version2, '');
    }

    if (RegExp_Cracked.test(name)) {
        rarFileInfo.cracked = true;
        name = name.replace(RegExp_Cracked, '');
    }

    if (RegExp_Regged.test(name)) {
        rarFileInfo.regged = true;
        name = name.replace(RegExp_Regged, '');
    }

    if (RegExp_KeyGen.test(name)) {
        rarFileInfo.keygen = true;
        name = name.replace(RegExp_KeyGen, '');
    }


    for (let devType of RegExp_DeviceTypes) {
        if (devType.regExp.test(name)) {
            if (devType.ceVersion) {
                rarFileInfo.ceVersion = devType.ceVersion;
            }
            if (devType.deviceType && !rarFileInfo.deviceTypes.includes(devType.deviceType)) {
                rarFileInfo.deviceTypes.push(devType.deviceType);
            }
            name = name.replace(devType.regExp, '');
        }
    }

    name = name.replace(RegExp_Group, '');

    name = name.replace(/[\._ ]retail-?$/i, '');

    for (let archEntry of RegExp_Architectures) {
        if (archEntry.regExp.test(name)) {
            addArches(archEntry.arches);
            name = name.replace(archEntry.regExp, '');
        }
    }

    name = name.replace(/[\._ ]retail-?$/i, '');

    // Clean up filename

    name = name.replace(/[\._]/g, ' ');


    rarFileInfo.name = name.trim();
    return rarFileInfo;
}



export async function getRarFileInfo(filepath: string) {
    let fileName = path.basename(filepath, ".rar");
    let fileNameFull = fileName;

    //console.log(fileName);
    try {
        const extractor = await createExtractorFromFile({
            filepath: filepath,
        });
        const fileList = extractor.getFileList();

        const rarDirs: string[] = [];
        for (let fileHeader of fileList.fileHeaders) {
            if (fileHeader.flags.directory && !fileHeader.name.includes("/")) {
                rarDirs.push(fileHeader.name);
            }
        }
        if (rarDirs.length == 1 && rarDirs[0].startsWith(fileName)) {
            fileNameFull = rarDirs[0];
        }
        //console.log(fileNameFull);
        return parseRarFileName(fileNameFull);
    } catch (err: any) {
        //console.log(err);
    }
}



//main();