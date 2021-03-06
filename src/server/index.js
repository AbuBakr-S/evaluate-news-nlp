// Allows use of environment variables set in .env file
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Install fetch
const fetch = require('node-fetch');

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

 app.post("/analyse", async function (req, res) {
    const app_key = process.env.API_KEY;
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${app_key}&of=json&txt=${req.body.text}&model=general&lang=en`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    const evaluation = {};
    evaluation.polarity = data.score_tag;
    evaluation.confidence = data.confidence;
    evaluation.subjectivity = data.subjectivity;
    evaluation.agreement = data.agreement;
    evaluation.irony = data.irony;
    res.send(evaluation);
    // this is the data we want
    console.log(req.body); 
    console.log(evaluation);
})