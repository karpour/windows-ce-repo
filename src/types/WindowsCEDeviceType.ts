export const WindowsCEDeviceTypes = ["HPC", "PPC", "Smartphone", "Automotive"] as const;
export type WindowsCEDeviceType = typeof WindowsCEDeviceTypes[number];

export const WindowsCEDeviceTypesExtended = ["HPC", "HPCPRO", "PSPC", "PPCVGA", "PPC", "PPC2000", "PPC2002", "PPC2003", "WM2003", "SMARTPHONE2002", "WM6", "WM6.0", "WM6.1", "WM6.2", "WP7"] as const;
export type WindowsCEDeviceTypeExtended = typeof WindowsCEDeviceTypesExtended[number];

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