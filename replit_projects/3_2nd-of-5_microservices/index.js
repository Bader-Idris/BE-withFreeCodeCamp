require('dotenv').config();
const express = require('express');
const app = express();
const myRouter = require('./myRouter')
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/api/', myRouter);

app.get('*', function (req, res) {
  res.send(
    '<pre>not found</pre>' +
    `<style>
      body {background-color: #121212;
      color: #fff;
    }</style>`
  );
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
