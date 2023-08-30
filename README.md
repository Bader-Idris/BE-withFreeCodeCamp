# BE and APIs with FreeCodeCamp

back end tasks provided by free code camp

## NPM with package.json

- the problem of unable to submit solutions was because of not including `https://` in the link: as `https://boilerplate-npm.bader-iddeenidd.repl.co`
- author, and description are good for other developers to get a hint about the project, they say.
- The keywords field is where you can describe your project using related keywords. Here's an example:

```json
"keywords": [ "descriptive", "related", "words" ],
```

- The `license` field is where you inform users of what they are allowed to do with your project. Some common licenses for open source projects include MIT and BSD. License information is not required, and copyright laws in most countries will give you ownership of what you create by default. but it's a best practice for saving your hard-working as: `"license": "MIT",`
- `version` is required. as: `"version": "1.0.0"`.
- dependencies are known and important. add this in thy package: `"@freecodecamp/example":"1.1.0"`

version prefixes

- json file follow what’s called Semantic Versioning (SemVer). as: `"package": "MAJOR.MINOR.PATCH"`
- The MAJOR version should increment when you make incompatible API changes. The MINOR version should increment when you add functionality in a backwards-compatible manner. The PATCH version should increment when you make backwards-compatible bug fixes. This means that PATCHes are bug fixes and MINORs add new features but neither of them break what worked before. Finally, MAJORs add changes that won’t work with earlier versions.
  - to allow npm to update only patches, which is securely useful and often safe, add tilde as: `~1.2.12`.
  - the caret: `^` allow MINOR and PATCH changes to occur.
- to remove packages, remove them from package.json

## Basic Node and Express

- this project will another package, and link to go through as all others, check them in the title, this has: `https://boilerplate-express.bader-iddeenidd.repl.co/`
- don't forget to restart the app after providing solutions
- notice: paths in `app.METHOD(PATH, HANDLER)` can be regExp, which opens many awesome ideas.
- one of the exercises:

```js
// https://boilerplate-express.bader-iddeenidd.repl.co
app.get('/', function(req, res) {
  res.send("Hello Express");
})
```

- the `.env` => **environment Variables file**, this file is to put server secrets inside of it, as known. as: API keys, and DB URI and configuration options. access it with: `process.env.VAR_NAME`
- The `process.env` object is a global Node object, and variables are passed as strings. vars are UPPERCASE

> ⚠️.env is a **shell file**

- setting values needs no spaces as `VAR_NAME=value`, I learned shell!
- in `replit.com` setting env secrets is as:

```js
const mySecret = process.env['MESSAGE_STYLE']
```

- in local project don't forget installing `dotenv` package, and called with `config()` as: `require('dotenv').config()`

> middleware Fns usually add information to the request or response objects. they're Fns with 3 arguments: `(req, res, next){sth \n next()}`

- they can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack.
- John brought some examples as handling errors and logging, and JWTs, that can be a great place to get ies from.

```js
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

- go to the lesson's location [**here**](https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/implement-a-root-level-request-logger-middleware) it's important  to revise from in there, and revise from John smilga's course files in github

> to get user ip use: `req.ip` that simple!

- Remember to call `next()` when you are done, or your server will be **stuck forever**
- this is an example of collecting useful data with req argument in middleware Fn, don't forget that express is a scripting code env. so put it above other Fns as:

```js
app.use((req, res, next) => {
  // string with format of: method path - ip
  // ie: GET /json - ::ffff:127.0.0.1
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})
```

- we can chain middleware Fns in an arbitrary styling same as with aligned showed in prior courses. see:

```js
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

- this is the testing example to get time now using js methods as a middleware:
<!-- the url: window.location.href = 'https://boilerplate-express.bader-iddeenidd.repl.co/now' -->
<!-- provided this for testing: https://boilerplate-express.bader-iddeenidd.repl.co -->

```js
app.get('/now', (req, res, next) => {
  // middleware
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time })
})

```

Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the `req.params` object.

```linux
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

a good lesson to practice req.params is:

- Build an echo server, mounted at the route `GET /:word/echo`. Respond with a JSON object, taking the structure `{echo: word}`. You can find the word to be repeated at `req.params.word`. You can test your route from your browser's address bar, visiting some matching routes, e.g. `your-app-rootpath/freecodecamp/echo`.

```js

app.get('/:word/echo', (req, res) => {
  let word = req.params.word;
  res.json({echo: word})
})

// window.location.href = 'https://boilerplate-express.bader-iddeenidd.repl.co/freecodecamp/echo'
// this will print :word => freecodecamp as json
```

- another common approach is by using queryString with `?` and `field=value` go for the lesson [here:](https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/get-query-parameter-input-from-the-client) Each couple is separated by an ampersand `(&)`
- express can populate data from queryString with `req.query` Obj.
- `%` cannot be in address bar: it becomes `%25` so it should be encoded in a different format before sending it. in JS we use `encodeURI()` and `decodeURI()` methods.
- an example of that queryString is:

```js
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

- with queryString I wasn't a real professional, need to practice, especially with: `const { first: firstName, last: lastName } = req.query;//✅` I used: `const { first, last } = req.query//❎`

```js
const fAndlNames = (req, res) => {
  const { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
}
app.route('/name').get(fAndlNames).post(fAndlNames)
```

- so these are the most common two approaches: `params` and `queryString`, look at those brought from web development with node&express book by O'reilly:

```txt
req object in express contains:
explained in P133
req.params
req.query => route params
req.body  => post content
req.route  => for route debugging
req.cookies/signedCookies => cookies by client
req.headers => came with node as req.url
req.accepts (types) => for public apis as MIME
req.ip => ip address
req.path without protocol, host, port, quertyStr
req.hostname => don't use it for sec purp
req.xhr => true if req's ajax call 
req.protocol => as /[https?]/
req.secure => if https => true
req.url/originalURL => path with queryStr but not including protocol, host, port
```

---

- In REST convention, POST is used to send data to create new items in the database (a new user, or a new blog post).
- data doesn’t appear in the URL with POST verb, it's in its `req.body`

> **The body is a part of the HTTP request, also called the payload**

- Even though the data is not visible in the URL, this does not mean that it is private. To see why, look at the raw content of an HTTP POST request:

```server
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```

- 