# quizzer
A generic quiz app framework

## Learnings
* Used ES6 forEach and that it gives the index of the current item in array and the array element itself. so there is no more need for a 'counter' variables
* 'String Literals' these are 
    * Multi-line capabilities
    * No more having to escape quotes within quotes because template literals use backticks instead
    * String interpolation, so you can embed JavaScript expressions right into your strings like this: ${code_goes_here}
* A smart use of 'slides' class rather than changing the contents of a div everytime. I wouldn't have thought of this. nice work!

## Pending Enhancements
* Add a progress bar.
* Let users review answers before submitting.
* Give users a summary of their answers after they submit. Show what is the correct answer vs. telling that comething is wrong
* Update the navigation to let users skip to any question number.
* Add a countdown timer to see if people can beat the clock.
* Only change the color style for the selected option and not all answer options in a question after submitting.
* Remove all the inline style changes and start making use of css classes
* Move the questions to a seperate repo and start using labels to choose the questions selectively.
* Build a job chain to see if any of the questions are duplicated (implement the style similarity algorithm)
* Add the questions from ML Coursera to here.
