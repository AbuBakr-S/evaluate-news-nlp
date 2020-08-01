var path = require('path')
const express = require('express')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

// Home route pointing to index.html
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})