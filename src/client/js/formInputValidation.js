function inputValidation() {

    let formText = document.getElementById('analyse-text').value;
    // Test regex to check for numbers only in the input box
    let pattern = /(^[0-9]+$)/;
    if(pattern.test(formText)){
    alert("Numbers only");
    console.log("error");
    } else {
        console.log("Valid");
    }

}

export { inputValidation }