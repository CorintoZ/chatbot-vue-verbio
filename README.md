# Login:lock: page and Chatbot:robot: with Vue.js

## First setup :computer:
```bash
$ npm install
```
## Compiles and hot-reloads for development
```bash
$ npm run serve
```
Run the mock back-end with:
```bash
$ cargo run 
```
## Deploy app
In order to deploy the application, we should run:
```bash
% npm run build
```
This builds the aplication ready for production(minified files) and we have acces to the folder /dist and index.html.
In addition, we should create a server for our application to run. Then, the server will redirect all the requests to index.html (SPA) which will handle the request to the correct route.
An example using express.js:
```javascript
const express = require('express')
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dis/"));
app.get(/.*/, function(req,res) {
  res.sendfile(__dirname + "/dist/index.html");
});
app.listen(port)
console.log("Server started...")
```
## Run unit tests
```
npm run test:unit
```
This project has some basic tests using Jest, although I would have liked to be able to test more elements.
## Project experience
I have enjoyed doing this project in Vue, I have managed to get an overview of the framework in a very short time. 
As a decision to highlight, this project uses a State management pattern (**Vuex** library) that is very intuitive and helps alter the state between components. I wanted to use this option because I think it is scalable and oriented to medium-to-large-scale SPA.
