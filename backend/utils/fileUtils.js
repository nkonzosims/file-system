const fs = require('fs/promises');
const path = require('path');

async function getDirectoryListing(dirPath) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    return await Promise.all(entries.map(async entry => {
        const fullPath = path.join(dirPath, entry.name);

        try {
            const stats = await fs.stat(fullPath);
            const ext = path.extname(entry.name);

            return {
                name: entry.name,
                fullPath,
                isDirectory: entry.isDirectory(),
                size: stats.size,
                extension: entry.isDirectory() ? null : ext,
                type: entry.isDirectory() ? 'directory' : 'file',
                createdAt: stats.birthtime,
                permissions: {
                    readable: !!(stats.mode & 0o400),
                    writable: !!(stats.mode & 0o200),
                    executable: !!(stats.mode & 0o100),
                }
            };
        } catch (err) {
            return {
                name: entry.name,
                fullPath,
                error: err.message
            };
        }
    }));
}

module.exports = { getDirectoryListing };
