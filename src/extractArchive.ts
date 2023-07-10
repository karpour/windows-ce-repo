import Seven from 'node-7z';


export function extractArchive(filePath: string, dir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // myStream is a Readable stream
        const myStream = Seven.extractFull(filePath, dir);
        myStream.on('end', resolve);
        myStream.on('error', reject);
    });
}
