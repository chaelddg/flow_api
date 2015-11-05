'use strict';

var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

var app = express();

var messages = path.join(__dirname, 'messages.json');

app.use(cors());

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/messages', function(req, res) {
	fs.readFile(messages, function(err, data) {
		res.setHeader('Cache-Control', 'no-cache');
		res.json(JSON.parse(data));
	});
});

app.post('/messages', function(req, res) {
	console.log('*** POST');
	console.log(req.body);
	fs.readFile(messages, function(err, data) {
		var message = JSON.parse(data);
		message.push(req.body);
		fs.writeFile(messages, JSON.stringify(message, null, 4), function(err) {
			res.setHeader('Cache-Control', 'no-cache');
			res.json(message);
		});
	});
});



app.listen(3001, function() {

	console.log('server on port 3001');

});


