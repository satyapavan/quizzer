// TODO : GLOBAL variable? really??

const quizContainer    = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton     = document.getElementById('submit');

function buildQuiz(){
  // we'll need a place to store the HTML output
  const output = [];

  //TODO : how is the value of questionNumber coming there? Interesting
  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        // This ` here is called a string literal. its better than a string
        answers.push(
          `<label>
            <input type="radio" name="question_${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    // TODO : Is this really going to be following same numbers? Better to use another set of hash mappings
    const answerContainer = answerContainers[questionNumber];
    const selector = 'input[name=question_'+questionNumber+']:checked';
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer===currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      //TODO : Add a CSS class not a direct style change. yuck!
      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
}

// display quiz right away
window.addEventListener("DOMContentLoaded", buildQuiz);

// on submit, show results
submitButton.addEventListener('click', showResults);