import { WindowsCEArchitecture } from "./WindowsCEArchitecture";
import { WindowsCECoreVersion } from "./WindowsCECoreVersion";

export const SCREENSHOT_DIR_NAME = "screenshots";

export const META_JSON_NAME = "index.json";

export const Platforms = ["Windows CE", "Windows 9x", "MacOS", "DOS", "Linux"] as const;
export type TitlePlatform = typeof Platforms[number];

export const Licenses = ["Freeware", "Shareware", "Trial"] as const;
export type TitleLicense = typeof Licenses[number];

export type WindowsCETitleVersions = { [key: string]: WindowsCETitleVersion; };

export type WindowsCETitle = {
    meta: WindowsCETitleMeta;
    readme?: string,
    versions: WindowsCETitleVersions;
    screenshots: TitleScreenshot[];
};

export type TitleScreenshot = {
    path: string;
    version?: string;
};


// TODO trial
export type WindowsCETitleMeta = {
    title: string,
    titleLong: string,
    platform: TitlePlatform;
    developer: string,
    publisher: string,
    cost: 0,
    costCurrency: string,
    hideDeveloperFromTitle: boolean,
    categories: string[],
    license: TitleLicense | "",
    successorOf: string,
    description: string,
    tags: string[],
    releaseDate: string,
    languages: string[],
    website: string,
    archivedWebsite: string,
};

type OptionalType<T> = {
    [K in keyof T]?: T[K]
};

export type WindowsCETitleMetaOptional = OptionalType<WindowsCETitleMeta>;

export const WindowsCETitleFilesTypes = ["setup", "binary", "cab", "mixed", "source"] as const;

export type WindowsCETitleFilesType = typeof WindowsCETitleFilesTypes[number];

export type WindowsCETitleFiles = {
    ceVersion: WindowsCECoreVersion,
    architectures: WindowsCEArchitecture[],
    type: WindowsCETitleFilesType,
    files: string[];
};

export type WindowsCETitleVersion = {
    meta?: WindowsCETitleMetaOptional,
    readme?: string,
    files: WindowsCETitleFiles[];
};

export const WindowsCEArchLongNames: { [key in WindowsCEArchitecture]: string } = {
    "X86": "Intel i386",
    "SH3": "Hitachi SuperH 3",
    "SH4": "Hitachi SuperH 4",
    "ARM": "ARM",
    "XSCALE": "Intel XScale",
    "MIPS": "MIPS R4000",
    "THUMB": "ARM Thumb"
};







