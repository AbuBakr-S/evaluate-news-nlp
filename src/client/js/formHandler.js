/*
function handleSubmit(event) {
    
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;
    console.log('::: Form Submitted :::');


    const postData = async (url = '', text = {}) => {
        console.log(text);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: formText}),
        })
        .then(res => res.json())
        .then(function(res) {
        //you can create div for polarity, confidence, subjectivity, irony, agreement. Access them using getElementById and render the response in innerHTML. The log below render all the response.
        console.log(res)
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch(error) {
            console.log('error', error);
        }
    }

    postData('http://localhost:8081/test', {text: formText});

}

export { handleSubmit }
*/


function handleSubmit(event) {
    
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById('analyse-text').value;
    console.log('::: Form Submitted :::');


    fetch('http://localhost:8081/test', {
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
    })

}

export { handleSubmit }