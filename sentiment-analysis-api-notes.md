# Sentiment Analysis API Setup
See an example on the website [here](https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/examples)

## Make the request in Terminal:
`curl -XPOST "https://api.meaningcloud.com/sentiment-2.1?key=e19ff8494545d8d4ed3d0f86f810bf7b&of=json&txt=Today's%20weather%20is%20looking%20warm%20and%20comfortable%20with%20a%20slight%20chance%20of%20rain%20in%20the%20evening.&model=general&lang=en"`

## JS Code
```
const BASEURL = "https://api.meaningcloud.com/sentiment-2.1?";
const APIKEY = "key=e19ff8494545d8d4ed3d0f86f810bf7b&of=json&";
const TEXT = "txt=Today's%20weather%20is%20looking%20warm%20and%20comfortable%20with%20a%20slight%20chance%20of%20rain%20in%20the%20evening.&model=general&lang=en";

console.log("::: Form Submitted. Getting Weather :::")
function handleSubmit(event) {
    event.preventDefault()
    fetch(BASEURL+APIKEY+TEXT)
    .then(data => data.json())
    .then(function(data) {
        document.getElementById('results').innerHTML = data.confidence;
        console.log(data.confidence);
    })
}
```