import { extractArchive } from './extractArchive';

async function extractExeActiveSync(filePath: string, dir: string) {
    // Spin up vm with snapshot

    // Transfer EXE

    // execute Installer script

    // Wait for flag to be set

    // pull files

}

export async function extractExe(filePath: string, dir: string) {
    try {
        await extractArchive(filePath, dir);
    } catch (err: any) {
        console.log(err);
    }
}

