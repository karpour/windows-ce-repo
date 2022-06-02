export const WindowsCEArchitectures = ["X86", "SH3", "SH4", "ARM", "XSCALE", "MIPS", "THUMB"] as const;
export type WindowsCEArchitecture = typeof WindowsCEArchitectures[number];