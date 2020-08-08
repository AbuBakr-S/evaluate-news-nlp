const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
var axios = require("axios");

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

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