function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;

    console.log("::: Form Submitted :::");
    fetch(`http://localhost:8081/test?name=${formText}`)
    .then(res => res.json())
    .then(function(res) {
        // This is the confidence rating by semantic analysis api
        document.getElementById('results').innerHTML = res.subjectivity;
    })
}

export { handleSubmit }
