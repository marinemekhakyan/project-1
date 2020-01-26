var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("assets/css", express.static(__dirname));
app.use("assets/images", express.static(__dirname + 'assets/images'));
app.use("assets/javascript", express.static(__dirname + 'assets/javascript'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});

app.listen(process.env.PORT || 8080);