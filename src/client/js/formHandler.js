function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;

    console.log("::: Form Submitted :::");
    // {text} is the query string parameter and the {formText} variable is the query string value
    fetch(`http://localhost:8081/analysis?text=${formText}`)
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.subjectivity;
    })
}

export { handleSubmit }