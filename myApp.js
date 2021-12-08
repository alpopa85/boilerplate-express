const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// const envMessageStyle = process.env['MESSAGE_STYLE'];
console.log('Hello World');
console.log(process.env.MONGO_URI);

try{
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.log('Cannot connect to DB', err);
}

// add middleware serving static files from public folder to the public path
// app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

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

app.get('/now', (req, res, next) => {
  res.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({
    time: res.time
  });
});

app.get('/:word/echo', (req, res) => {
  res.send({
    echo: req.params.word ? req.params.word : 'N/A'
  })
});

app.route('/name')
  .get((req, res) => {
    res.send({
      name: `${req.query.first} ${req.query.last}`
    })
  })
  .post((req, res) => {
    console.log(req.body);
    res.send({
      name: `${req.body.first} ${req.body.last}`
    })
  });






























 module.exports = app;
