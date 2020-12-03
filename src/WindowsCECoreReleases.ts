import { WinCECoreVersion } from "./types/WinCECoreVersion";

export type WindowsCEVersionInfo = {
    //codeName: string;
    name: string;
    releaseDate: string,
    lifecycleStartDate?: string,
    mainstreamSupportEndDate?: string,
    extendedSupportEndDate?: string;
};

export const WindowsCECoreReleases: { [key in WinCECoreVersion]: WindowsCEVersionInfo; } = {
    "1.0": {
        name: "Windows CE 1.0",
        releaseDate: "1996-11-16",
        mainstreamSupportEndDate: "2001-12-31",
    },
    "1.01": {
        name: "Windows CE 1.01",
        releaseDate: "1997-06-25",
        mainstreamSupportEndDate: "2001-12-31",
    },
    "2.0": {
        name: "Windows CE 2.0",
        releaseDate: "1997-09-29",
        mainstreamSupportEndDate: "2002-09-30",
    },
    "2.01": {
        name: "Windows CE 2.01",
        releaseDate: "1998-01-08",
        mainstreamSupportEndDate: "2002-09-30",
    },
    "2.10": {
        name: "Windows CE 2.10",
        releaseDate: "1998-03-01",
        mainstreamSupportEndDate: "2002-09-30",
    },
    "2.11": {
        name: "Windows CE 2.11",
        releaseDate: "1998-07-01",
        lifecycleStartDate: "1998-10-31",
        mainstreamSupportEndDate: "2002-09-30",
    },
    "2.12": {
        name: "Windows CE 2.12",
        releaseDate: "1999-09-28",
        lifecycleStartDate: "1999-08-31",
        mainstreamSupportEndDate: "2003-09-30",
        extendedSupportEndDate: "2005-09-30",
    },
    "3.0": {
        name: "Windows CE 3.0",
        releaseDate: "2000-06-15",
        lifecycleStartDate: "2000-7-30",
        mainstreamSupportEndDate: "2005-09-30",
        extendedSupportEndDate: "2007-10-9",
    },
    "4.0": {
        name: "Windows CE .NET 4.0",
        releaseDate: "2002-01-07",
        lifecycleStartDate: "2002-4-1",
        mainstreamSupportEndDate: "2007-07-10 ",
        extendedSupportEndDate: "2012-7-10",
    },
    "4.10": {
        name: "Windows CE .NET 4.1",
        releaseDate: "2002-06-01",
        lifecycleStartDate: "2002-10-29",
        mainstreamSupportEndDate: "2008-01-8",
        extendedSupportEndDate: "2013-01-8",
    },
    "4.20": {
        name: "Windows CE .NET 4.2",
        releaseDate: "2003-04-23",
        lifecycleStartDate: "2003-06-1",
        mainstreamSupportEndDate: "2008-07-8",
        extendedSupportEndDate: "2013-07-9",
    },
    "5.0": {
        name: "Windows CE 5.0",
        releaseDate: "2004-07-09",
        lifecycleStartDate: "2004-08-31",
        mainstreamSupportEndDate: "2009-10-13",
        extendedSupportEndDate: "2014-10-14",
    },
    "6.0": {
        name: "Windows Embedded CE 6.0",
        releaseDate: "2006-11-01",
        lifecycleStartDate: "2006-11-30 ",
        mainstreamSupportEndDate: "2013-4-9",
        extendedSupportEndDate: "2018-4-10",
    },
    "7.0": {
        name: "Windows Embedded Compact 7",
        releaseDate: "2011-03-01",
        lifecycleStartDate: "2011-3-15",
        mainstreamSupportEndDate: "2016-4-12",
        extendedSupportEndDate: "2021-4-13",
    },
    "8.0": {
        name: "Windows Embedded Compact 2013",
        releaseDate: "2013-06-13",
        lifecycleStartDate: "2013-08-11",
        mainstreamSupportEndDate: "2018-10-9",
        extendedSupportEndDate: "2023-10-10",
    },
};