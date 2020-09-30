// TODO : GLOBAL variable? really??

const quizContainer = document.getElementById('quiz');

// pagination
const nextButton = document.getElementById("next");

////////////////////////////////////////////////////////////////////////////

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadData() {

  fetch('./questions/questions.json')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (json) {
          console.log(json);
          let loadedQuestions = json['quizzer']
          console.log('Inside loadData:', loadedQuestions)

          loadedQuestions.forEach(
            (currentQuestion, questionNumber) => {
              console.log('------------------------------------')
              console.log('BEFORE', currentQuestion);

              currentQuestion.question = decodeURIComponent(escape(window.atob(currentQuestion.question)));
              currentQuestion.skill = currentQuestion.skill;

              for (letter in currentQuestion.answers) {
                currentQuestion.answers[letter] = decodeURIComponent(escape(window.atob(currentQuestion.answers[letter])));
              }
              console.log('AFTER', currentQuestion);
            }
          );
          // Shuffle the questions so that the same questions are showed again and again
          shuffleArray(loadedQuestions);

          // TIL : This converts a local variable into a global variable. nice!
          window.quizQuest = loadedQuestions; // .slice(0, 1);

          showQuestion();
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function showQuestion() {
  // Get the latest question. Here shift pop's the first element out from array and returns it
  window.currentQuestion = quizQuest.shift();
  console.log('Inside showQuestion:', currentQuestion)

  // we'll need a place to store the HTML output
  const output = [];

  // we'll want to store the list of answer choices
  const answers = [];

  // and for each available answer...
  for (letter in currentQuestion.answers) {
    // This ` here is called a string literal. its better than a string
    // justify-content-between - is necessary to keep the span on the right end. else it moved to the left based on content
    answers.push(
      `<button type="button" class="btn btn-light btn-block text-left d-flex justify-content-between" 
            id="option-${letter}" attr-value="${letter}">
      <div>${currentQuestion.answers[letter]}</div>
      <div><span id="span-${letter}"></span></div>
          </button>`
    );
  }

  console.log(answers.join(''));

  // add this question and its answers to the output
  output.push(
    `<div class="alert text-left mb-0 p-2" role="alert">
    ${currentQuestion.question}
    <h6 class="alert-heading font-italic text-right">#${currentQuestion.skill}</h6>
    </div>
        <hr class="mt-0">
       ${answers.join('')}
         `
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');

  ['a', 'b', 'c', 'd'].forEach((itr) => {
    document.getElementById(`option-${itr}`).addEventListener("click", function () {
      // Super simple logic to determine which button is clicked :-)
      showResults(itr);
    });
  });
}

function showResults(selectedAnswer) {
  console.log("The Selected Answer is : ", selectedAnswer);
  console.log("The Correct  Answer is : ", currentQuestion.correctAnswer);

  ['a', 'b', 'c', 'd'].forEach((itr) => {
    document.getElementById(`option-${itr}`).disabled = true;
  });

  // if answer is correct, then color them green
  if (selectedAnswer === currentQuestion.correctAnswer) {
    document.getElementById(`option-${selectedAnswer}`).classList.replace('btn-light', 'btn-success');

    document.getElementById(`span-${selectedAnswer}`).innerHTML =
      `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>`

  }
  // if answer is wrong or blank color the answers red
  else {
    document.getElementById(`option-${selectedAnswer}`).classList.replace('btn-light', 'btn-outline-danger');
    document.getElementById(`option-${currentQuestion.correctAnswer}`).classList.replace('btn-light', 'btn-outline-success');

    document.getElementById(`span-${selectedAnswer}`).innerHTML =
      `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>`;

    document.getElementById(`span-${currentQuestion.correctAnswer}`).innerHTML =
      `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>`
  }
}

nextButton.addEventListener("click", showQuestion);

// display quiz right away
window.addEventListener("DOMContentLoaded", loadData);