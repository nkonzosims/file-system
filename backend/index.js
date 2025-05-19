const express = require('express');
const os = require('os');
const { getDirectoryListing } = require('./utils/fileUtils');

const app = express();
const PORT = process.env.PORT || 3000;
const UI_HOST_MACHINE = process.env.UI_HOST_MACHINE || 'http://localhost:4200';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', UI_HOST_MACHINE);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});


app.get('/api/v1/directory', async (req, res) => {
    const dirPath = req.query.path || os.homedir();

    try {
        const result = await getDirectoryListing(dirPath);
        res.json({ path: dirPath, contents: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
