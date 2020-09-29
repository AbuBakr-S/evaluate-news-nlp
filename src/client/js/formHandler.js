function handleSubmit(event) {
    
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;
    console.log('::: Form Submitted :::');

    fetch('http://localhost:8081/analyse', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: formText})
    })
    .then(res => res.json())
    .then(function(res) {
    //you can create div for polarity, confidence, subjectivity, irony, agreement. Access them using getElementById and render the response in innerHTML. The log below render all the response.
    console.log(res);
    let polarity = document.getElementById('polarity');
    let confidence = document.getElementById('confidence');
    let subjectivity = document.getElementById('subjectivity');
    let agreement = document.getElementById('agreement');
    let irony = document.getElementById('irony');

    polarity.innerHTML = res.polarity;
    confidence.innerHTML = res.confidence;
    subjectivity.innerHTML = res.subjectivity;
    agreement.innerHTML = res.agreement;
    irony.innerHTML = res.irony;
    });

}

export { handleSubmit }