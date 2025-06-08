import Seven from 'node-7z';


export function extractArchive(filePath: string, dir: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // myStream is a Readable stream
        const myStream = Seven.extractFull(filePath, dir);
        myStream.on('end', () => resolve(dir));
        myStream.on('error', reject);
    });
}
