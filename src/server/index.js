// Allows use of environment variables set in .env file
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');

var axios = require('axios');

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

// Route to retrieve input text query param from FE to BE
app.get('/analysis', function (req, res) {
   let data = {};       // This is my data repository
   const text = req.query.text;     // Use the request.query object to access the query string parameter passed in the URL
   axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${text}&model=general&lang=en`, {})
   .then(function (response){
       const result = response.data; 
       data["sentence"] = text;
       data["subjectivity"] = result.subjectivity; 
       res.json(data);
       res.end();       // Ends the response process
   }) 
   .catch (function (error) {
       console.log(error);
       res.end();
   })
})