function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;
    console.log('::: Form Submitted :::');
    fetch(`http://localhost:8081/test?text=${formText}`);
}

export { handleSubmit }