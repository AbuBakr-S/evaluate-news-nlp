function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value
    // Example text provided by the semantic analysis api
    let example = "Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me."

    console.log("::: Form Submitted :::")
    // TODO: API_KEY reference to env variable is currently not working. This needs to be fixed
    fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${example}&model=general&lang=en`)
    .then(res => res.json())
    .then(function(res) {
        // This is the confidence rating by semantic analysis api
        document.getElementById('results').innerHTML = res.confidence
    })
}

export { handleSubmit }
