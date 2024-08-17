const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/save-data', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'data.json');
    
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err && err.code === 'ENOENT') {
            // File does not exist, create a new one
            fs.writeFile(filePath, JSON.stringify([data], null, 2), (err) => {
                if (err) return res.status(500).json({ error: 'Error saving data' });
                res.json({ message: 'Data saved successfully' });
            });
        } else if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        } else {
            // File exists, append data
            const jsonData = JSON.parse(fileData);
            jsonData.push(data);
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) return res.status(500).json({ error: 'Error saving data' });
                res.json({ message: 'Data saved successfully' });
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
