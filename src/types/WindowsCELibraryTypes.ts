import { WinCEArchitecture } from "./WinCEArchitecture";
import { WinCECoreVersion } from "./WinCECoreVersion";

export const SCREENSHOT_DIR_NAME = "screenshots";

export const META_JSON_NAME = "index.json";

export const WindowsCEDeviceTypesExtended = ["HPC", "HPCPRO", "PSPC", "PPCVGA", "PPC", "PPC2000", "PPC2002", "PPC2003", "WM2003", "SMARTPHONE2002", "WM6", "WM6.0", "WM6.1", "WM6.2", "WP7"] as const;
export type WindowsCEDeviceTypeExtended = typeof WindowsCEDeviceTypesExtended[number];

export const WindowsCEDeviceTypes = ["HPC", "PPC", "Smartphone"] as const;
export type WindowsCEDeviceType = typeof WindowsCEDeviceTypes[number];

export const DeviceTypeMap: { [key in WindowsCEDeviceTypeExtended]: WindowsCEDeviceType } = {
    "HPC": "HPC",
    "HPCPRO": "HPC",
    "PSPC": "PPC",
    "PPCVGA": "PPC",
    "PPC": "PPC",
    "PPC2000": "PPC",
    "PPC2002": "PPC",
    "PPC2003": "PPC",
    "WM2003": "PPC",
    "SMARTPHONE2002": "Smartphone",
    "WM6": "PPC",
    "WM6.0": "PPC",
    "WM6.1": "PPC",
    "WM6.2": "PPC",
    "WP7": "PPC"
};

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
    ceVersion: WinCECoreVersion,
    architectures: WinCEArchitecture[],
    type: WindowsCETitleFilesType,
    files: string[];
};

export type WindowsCETitleVersion = {
    meta?: WindowsCETitleMetaOptional,
    readme?: string,
    files: WindowsCETitleFiles[];
};

export const WindowsCEArchLongNames: { [key in WinCEArchitecture]: string } = {
    "X86": "Intel i386",
    "SH3": "Hitachi SuperH 3",
    "SH4": "Hitachi SuperH 4",
    "ARM": "ARM",
    "XSCALE": "Intel XScale",
    "MIPS": "MIPS R4000",
    "THUMB": "ARM Thumb"
};







