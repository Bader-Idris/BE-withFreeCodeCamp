const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const connectDB = require('./db/connect');
const fileApi = require('./routes/fileApi')
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api', fileApi)

app.get('*', function (req, res) {
  res.send(
    '<pre>not found</pre>' +
    `<style>
      body {background-color: #121212;
      color: #fff;
    }</style>`
  );
});

const start = async () => {
  const connectAndListen = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Listening on port ${port}...`)
      );
      clearInterval(retryInterval); // Connection successful, stop retrying
    } catch (error) {
      console.log(error);
    }
  };
  const retryInterval = setInterval(connectAndListen, 5000); // Retry every 5 seconds
};
start();