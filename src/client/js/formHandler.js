function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        // TODO: Change this to the "analyse-text" data
        document.getElementById('name').innerHTML = res.message
    })
}

export { handleSubmit }
