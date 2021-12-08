var express = require('express');
var app = express();
var path = require('path');

// const envMessageStyle = process.env['MESSAGE_STYLE'];
console.log('Hello World');

// add middleware serving static files from public folder to the public path
// app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) => {
  let method = req.method;
  let url = req.url;
  let ip = req.ip;
  console.log(`${method} ${url} - ${ip}`);

  next();
});

app.get('/', (req, res) => {
  // res.send('Hello Express');
  // res.sendFile(__dirname + '/views/index.html');
  let indexPath = path.resolve(__dirname, 'views', 'index.html');
  res.sendFile(indexPath);
});

app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    res.json({
      "message": "HELLO JSON"
    });
  } else {
    res.json({
      "message": "Hello json"
    });
  }  
});

































 module.exports = app;
