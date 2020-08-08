// Allows use of environment variables
const dotenv = require('dotenv');
dotenv.config();

var path = require('path');

// Require Express to run server and routes
const express = require('express');

// Axios is a promise based HTTP client for the browser and Node. js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations
var axios = require("axios");

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialise the main project folder
app.use(express.static('dist'));

console.log(__dirname);

// Home route pointing to index.html
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
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