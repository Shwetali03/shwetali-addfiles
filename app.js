const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader('Content-Type', 'text/plain');

    if (url === '/create' && method === 'POST') {
        fs.writeFile('myfile.txt', 'This is a sample file', (err) => {
            if (err) {
                res.end('Error creating file');
            } else {
                res.end('File created successfully!');
            }
        });

    } else if (url === '/read' && method === 'GET') {
        fs.readFile('myfile.txt', 'utf8', (err, data) => {
            if (err) {
                res.end('File not found');
            } else {
                res.end(`File content: ${data}`);
            }
        });

    } else if (url === '/delete' && method === 'DELETE') {
        fs.unlink('myfile.txt', (err) => {
            if (err) {
                res.end('File not found or already deleted');
            } else {
                res.end('File deleted successfully!');
            }
        });

    } else {
        res.end('Welcome to File Manager! Use /create (POST), /read (GET), /delete (DELETE)');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
