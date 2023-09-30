let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

console.log("Hello World")

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use('/public', express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({
      message: "Hello json".toUpperCase()
    });
  }

  res.json({
    message: "Hello json"
  });
})

app.get('/now', (req, res, next) => {
  // middleware
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
  let word = req.params.word;
  res.json({ echo: word })
})

const fAndlNames = (req, res) => {
  // const { first: firstName, last: lastName } = req.query;
  const { first: firstName, last: lastName } = req.body;
  res.json({
    name: `${firstName} ${lastName}`
  });
