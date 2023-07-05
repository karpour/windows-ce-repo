export const WindowsCECoreVersions = ["1.0", "1.01", "2.0", "2.01", "2.10", "2.11", "2.12", "3.0", "4.0", "4.10", "4.20", "4.21", "5.0", "5.01", "5.02", "6.0", "7.0", "8.0"] as const;
export type WindowsCECoreVersion = typeof WindowsCECoreVersions[number];

export const WindowsCeDeviceType = [
    'HPC',
    'PPC',
    'PSPC',
    'SMARTPHONE',
    'AUTO'
]

export const WindowsCeVersionNames = [
    'HPC2000',
    'JUPITER',
    'PALM PC',
    'PALM PC2',
    'PALM-SIZE PC',
    'POCKETPC',
    'PPC2000',
    'PPC2002',
    'PPC2003',
    'WM2003',
    'PPC2003SE',
    'WM2003SE',
    'SMARTPHONE2002',
    'SMARTPHONE2003',
    'SMARTPHONE2003SE',
    'SMARTPHONEWM5',
    'SMARTPHONEWM6',
    'WM5',
    'WM6',
    'WM6.1',
    'WM6.5',
    'AUTOPC',
] as const;
export type WindowsCeVersionName = typeof WindowsCeVersionNames[number];

//Pocket PC 2000: Windows CE 3.0(Build under 10.000)
//Pocket PC 2002: Windows CE 3.0(Build over 10.000)
//Pocket PC 2003: Microsoft Pocket PC Version 4.20
//Pocket PC 2003 SE(Second Edition): Microsoft Windows Mobile Version 4.21 or higher
//Pocket PC WM 5: Microsoft Windows Mobile Version 5.1
//Pocket PC WM 6: Microsoft Windows Mobile Version 5.2
//
//Smartphone 2002: Windows CE 3.0
//Smartphone 2003: Microsoft Windows Smartphone Version 4.20
//Smartphone 2003 SE(Second Edition): Microsoft Windows Mobile Smartphone Version 4.21 or higher
//Smartphone WM 5: Microsoft Windows Mobile Version 5.1
//Smartphone WM 6: Microsoft Windows Mobile Version 5.2;
//
//
//SmartPhone 2002 (Windows Mobile 2002): Windows CE 3.0
//Windows Mobile 2003: Windows CE 4.20
//Windows Mobile 2003 SE: Windows CE 4.21
//Windows Mobile 5.0: Windows CE 5.1
//Windows Mobile 6.0: Windows CE 5.2
//Windows Mobile 6.1: Windows CE 5.2


//export const NAME_TO_WINDOWS_CE_CORE_VERSION: { [key in WindowsCeVersionName]: WindowsCECoreVersion } = {
//
//};