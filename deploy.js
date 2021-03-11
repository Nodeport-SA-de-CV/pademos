const express = require('express');
const path = require('path');
const app = express();
const appRedirect = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

// Certificate
const privateKey = fs.readFileSync('ssl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
const ca = fs.readFileSync('ssl/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Starting both http & https servers
const httpsServer = https.createServer(credentials, app);
const httpsPort   = 9091;

const httpServer = http.createServer(credentials, app);
const httpPort   = 9090;


httpsServer.listen(httpsPort, () => {
	console.log(`HTTPS Server running on port ${httpsPort}`);
});
httpServer.listen(httpPort, () =>{
	console.log(`HTTP Server running on port ${httpPort}`);
})
