const httpServer = require("http-server");
const http = require("http");
const localtunnel = require("localtunnel");

const webServer = httpServer.createServer({
    root: "./build"
});

const WEB_PORT = 9000;

webServer.listen(WEB_PORT, () => {
    console.log(`Evoke local web server started on http://localhost:${WEB_PORT}`);
});

const networkServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Local network server is running!\n');
});

const NETWORK_PORT = 9001;

networkServer.listen(NETWORK_PORT, () => {
    console.log(`Local network server started on http://localhost:${NETWORK_PORT}`);
    localtunnel(NETWORK_PORT, (err, tunnel) => {
        if (err) {
            console.error('Error creating tunnel:', err);
        } else {
            console.log('Local network server is accessible via:', tunnel.url);
        }
    });
});
