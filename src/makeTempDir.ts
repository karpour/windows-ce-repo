import fs from "fs";
import os from "os";
import path from "path";

export default function makeTempDir(): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'wince-'));
}