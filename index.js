const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = 3000;

const baseDir = process.pkg ? path.dirname(process.execPath) : __dirname;
const uploadDir = path.join(baseDir, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Serve React build

const getIpAddress = () => {
    const interfaces = os.networkInterfaces();
    let addresses = [];
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }
    return addresses;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

app.use(cors())

app.get('/', (req, res) => {
    res.send(`Request received at ${getIpAddress().join(", ")}!`);
});

app.post("/upload", upload.single("file"), (req, res) => {
    res.send("File uploaded successfully!");
});

app.get('/download', (req, res) => {
    const filename = path.basename(req.query.filename); // sanitize input
    if (!filename) {
        return res.status(400).send("Filename is required");
    }
    const file = path.join(uploadDir, filename);
    res.download(file, filename, (err) => {
        if (err) {
            res.status(404).send("File not found");
        }
    });
});

app.delete('/delete', (req, res) => {
    const filename = path.basename(req.query.filename); // sanitize input
    const file = path.join(uploadDir, filename);

    fs.unlink(file, (err) => {
        if (err) {
            res.status(404).send("File not found");
        } else {
            res.send("File deleted successfully");
        }
    });
});

app.get('/files', (req, res) => {
    const directoryPath = uploadDir;

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send("Unable to scan directory: " + err);
        }
        res.json({ files });
    });
});

app.use((req, res, next) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, "0.0.0.0", () => {
    const addresses = getIpAddress();
    if (addresses.length === 0) {
        console.log("No IPv4 addresses found.");
        return;
    }
    console.log(`Server is running on:`);
    addresses.forEach(addr => {
        console.log(`  http://${addr}:${PORT}`);
    });
});