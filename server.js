const http = require('http');
const dispatcher = require('httpdispatcher');

dispatcher.onError((req, res) => {
	res.writeHead(404);
});

dispatcher.onPost('/greenhouse', (req, res) => {
	console.log((new Date()).toString() + '\t' + req.params.temp + '\t' + req.params.humidity + '\t' + req.params.moisture);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('ok');
});

http.createServer((req, res) => {
	dispatcher.dispatch(req, res);
}).listen(8001, '192.168.5.104', () => {
	console.log('Listening on port 8001');
});
