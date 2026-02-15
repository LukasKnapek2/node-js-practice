let http = require('http');
let fs = require('fs');
const { URL } = require('url');
const path = require('path');

function readFileHandler(filename, response, statusCode = 200) {
    fs.readFile(path.join(__dirname, filename), function (err, data) {
         if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end()
        }
        
        else {
            response.writeHead(statusCode, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        }
    
        
    });
}
const server = http.createServer(function (request, response) {
 const myUrl = new URL(request.url, 'http://localhost:8080');
 const pathname = myUrl.pathname;
 const query = myUrl.searchParams;


         if (request.method !== 'GET') {
            response.writeHead(405, { 'Content-Type': 'text/html' });
            response.write('<h1>Method Not Allowed</h1>');
            response.end();
            return
        }
        else if(pathname === '/') {
                readFileHandler('index.html', response);
        }
         else if (pathname === '/about') {
            readFileHandler('about.html', response);
        }
        else if (pathname === '/contact-me') {
            readFileHandler('contact-me.html', response);
        }
        else {
            let pathNotFound = '404.html';
            readFileHandler(pathNotFound, response, 404);
        }

})

server.listen(8080);