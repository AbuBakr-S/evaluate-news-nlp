// Allows use of environment variables set in .env file
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware Dependencies - Express*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));       // Set to true as the API requires input data to be urlencoded
app.use(bodyParser.json());     // Returns middleware that only parses json

// Cors for cross origin allowance - allows the browser and server to communicate without any security interruptions
const cors = require('cors');
app.use(cors());

// Initialise the main project folder, connecting server-side with client side
app.use(express.static('dist'));

// Home route pointing to index.html in dist folder for the client
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Designates what port the app will listen to for incoming requests
// You can’t run two apps on the same port at the same time. If webpack is running on port 8080, use another port e.g. 8081
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

// TEST

app.get("/test", function (req, res){
    let projectData = {};
    const text = req.query.text;
    projectData["sentence"] = text;
    // API Response:    projectData["subjectivity"]= result.subjectivity; 
    console.log(projectData);

    /* Testing Server Side API Request */
    const encodedText = encodeURIComponent(text); 
    fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${encodedText}&model=general&lang=en`)
    .then(res => res.json())
    .then(function(res) {
        console.log(res.body);
    });
 })