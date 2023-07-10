// Initiate the count variable
var count = 0;

// If the add-response button is clicked
$("#add-response").click(function() {
    
    // Add a 'current' variable for the html part
    var current = count + 2;

    // Delete the the not needed x button from the n-1 option
    $('#responses').children().last().children().last().children().last().hide()
    
    // Add another option at the bottom
    $('#responses').append(`<div class='`+ current +`'>
        <label for="inputQuestion" class="form-label">Optiunea `+ current +`:</label>
        <div class="input-group">
            <input type="text" id="inputQuestionChoice" class="form-control" required>
            <button class="btn btn-outline-danger" onClick="removeLastOption()" type="button" id="delete-response"><i class="bi bi-x"></i></button>
        </div>
    </div>`);

    // Increment the count
    count += 1;

    // If the count is bigger than 3, hide the add-response button
    if (count >= 3) {
        $("#add-response").hide()
    }
});

function removeLastOption() {
    console.log(count)
    if (count > 0) {
        $('#responses').children().last().remove();
    }
    if (count == 3) {
        $("#add-response").show()
    }
    $('#responses').children().last().children().last().children().last().show()
    count -= 1;
}



// Form Handling

// Get the form element
const form = document.getElementById('uploadPool');

// Add 'submit' event handler
form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

        form.classList.add('was-validated')
    } else {
        event.preventDefault();

        let title = document.getElementById('inputTitle').value;
        let description = document.getElementById('inputDescription').value;
        let endDate = document.getElementById('inputEndDate').value;
        let question = document.getElementById('inputQuestion').value;

        let choices = document.querySelectorAll('#inputQuestionChoice');
        
        let questions = []

        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            let questions_text = {'question_text' : choice.value}
            questions.push(questions_text)
        }

        $('.submit-button').html(`<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`)

        fetch('../api/pools/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken' : csrftoken
            },
            body: JSON.stringify(
                { 
                    "title": title,
                    "description" : description,
                    "end_date" : endDate,
                    "question" : question,
                    "questions" : questions,
                }  
            )
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

});
