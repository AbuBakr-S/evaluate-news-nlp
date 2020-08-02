function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value

    console.log("::: Form Submitted :::")
    // TODO: API_KEY reference to env variable is currently not working. This needs to be fixed
    fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${formText}&model=general&lang=en`)
    .then(res => res.json())
    .then(function(res) {
        // This is the confidence rating by semantic analysis api
        document.getElementById('results').innerHTML = res.confidence
        console.log(formText)
    })
}

export { handleSubmit }
