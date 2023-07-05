import Seven from 'node-7z';

async function extractExeActiveSync(filePath: string, dir: string) {
    // Spin up vm with snapshot

    // Transfer EXE

    // execute Installer script

    // Wait for flag to be set

    // pull files

}

export async function extractExe(filePath: string, dir: string) {
    try {
        await sevenZipExtract(filePath, dir);
    } catch (err: any) {
        console.log(err);
    }
}

export function sevenZipExtract(filePath: string, dir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // myStream is a Readable stream
        const myStream = Seven.extractFull(filePath, dir);

        myStream.on('end', function () {
            resolve();
        });

        myStream.on('error', (err) => reject(err));
    });
}