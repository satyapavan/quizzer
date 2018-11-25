// TODO : GLOBAL variable? really??

const quizContainer    = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton     = document.getElementById('submit');

// pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

////////////////////////////////////////////////////////////////////////////

//    If we’re on the first slide, hide the Previous Slide button. Otherwise, show the button.
//    If we’re on the last slide, hide the Next Slide button and show the Submit button. Otherwise, show the Next Slide button and hide the Submit button.

function showSlide(n) {

  if(typeof slides != 'undefined') {
      slides[currentSlide].classList.remove('active-slide');
  }
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide===0){
    previousButton.classList.remove('show-btn');
    previousButton.classList.add('hide-btn');
  }
  else{
    previousButton.classList.add('show-btn');
    previousButton.classList.remove('hide-btn');
  }
  if(currentSlide===slides.length-1){
    nextButton.classList.add('hide-btn');
    nextButton.classList.remove('show-btn');

    submitButton.classList.remove('hide-btn');
    submitButton.classList.add('show-btn');
  }
  else{
    nextButton.classList.remove('hide-btn');
    nextButton.classList.add('show-btn');

    submitButton.classList.add('hide-btn');
    submitButton.classList.remove('show-btn');
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

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
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
         </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');

  slides = document.querySelectorAll(".slide");
  showSlide(0);
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


previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// display quiz right away
window.addEventListener("DOMContentLoaded", buildQuiz);

// on submit, show results
submitButton.addEventListener('click', showResults);