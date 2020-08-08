// Allows use of environment variables set in .env file
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Axios is a promise based HTTP client for the browser and Node. js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations
var axios = require("axios");

/* Middleware Dependencies - Express*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Cors for cross origin allowance - allows the browser and server to communicate without any security interruptions
const cors = require('cors');
app.use(cors());

// Initialise the main project folder, connecting server-side with client side
app.use(express.static('dist'));

// A node script that returns the path of the folder where the current JavaScript file resides.
console.log(__dirname);

// Home route pointing to index.html in dist folder for the client
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get("/test", function (req, res){
    let projectData = {};
    const name = req.query.name;
    axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${name}&model=general&lang=en`, {})
    .then(function (response){
        const result = response.data; 
        projectData["sentence"] = name;
        projectData["subjectivity"]= result.subjectivity; 
        res.json(projectData);
        res.end();
    }) 
    .catch (function (error) {
        console.log(error);
        res.end();
    })
})