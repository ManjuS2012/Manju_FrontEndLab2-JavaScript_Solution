let questions = [
  new Question(
    "Question 1: Inside which HTML element do we put the JavaScript?",
    ["script", "js", "javascript", "scripting"],
    "script"
  ),
  new Question(
    "Question 2: JavaScript Supports?",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Question 3: What is the correct syntax for referring to an external script called xxx.js?",
    ["script name", "script href", "script src", "None"],
    "script src"
  ),
  new Question(
    "Question 4: How do you write 'Hello World' in an alert box?",
    ["msgBox", "alert", "msg", "alertBox"],
    "alertBox"
  ),
  new Question(
    "Question 5: JavaScript is a which -side programming language?",
    ["Client", "Server", "Both", "None"],
    "Both"
  ),
  new Question(
    "Question 6: Which JavaScript label catches all the values, except for the ones specified?",
    ["catch", "label", "try", "default"],
    "default"
  ),
  new Question(
    "Question 7: Which are the correct 'if' statements to execute certain code if 'x' is equal to 2?",
    ["if(x 2)", "if(x = 2)", "if(x == 2)", "if(x != 2 )"],
    "if(x == 2)"
  ),
  new Question(
    "Question 8: What does JSON stand for ?",
    [
      "Java Simple Object Notation",
      "JavaScript Object Notation",
      "Java Semi Object Notation",
      "None of the above",
    ],
    "JavaScript Object Notation"
  ),
];

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.index];
};

Quiz.prototype.checkForCorrectAnswer = function (answer) {
  //Question -> this.getQuestionByIndex() -> question2
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.index++;
};

Quiz.prototype.isEnded = function () {
  return this.index === this.questions.length;
};

function Question(questionText, choices, answer) {
  this.text = questionText;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function loadQuestions() {
  if (quiz.isEnded()) {
    showFinalScores();
  } else {
    let currentQuestion = quiz.getQuestionByIndex();

    let element = document.getElementById("question"); // <p id="question"></p>
    element.innerHTML = currentQuestion.text;

    let choices = currentQuestion.choices;
    for (let i = 0; i < choices.length; i++) {
      let eachChoiceElement = document.getElementById("choice" + i); //<span id="choice0"></span>
      eachChoiceElement.innerHTML = choices[i];

      let eachButtonElement = document.getElementById("btn" + i);
      eachButtonElement.onclick = function () {
        quiz.checkForCorrectAnswer(choices[i]);
        loadQuestions();
      };
    }
    showProgress();
  }
}
let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
  let resultPercentage = (quiz.score / questions.length) * 100;
  let completeHTML = `<h1> Result </h1>
     <h2 id='score'> Your Scores : ${quiz.score} </h2>
     <h3>And mark percentage is : ${resultPercentage}%  </h3> 
     <hr><h1>Congrats you have successfully completed the Quiz!!!</h1> 
    `;
  let quizCanavs = document.getElementById("quiz");
  quizCanavs.innerHTML = completeHTML;
}

function showProgress() {
  let questNo = quiz.index + 1;
  let element = document.getElementById("progress");
  element.innerHTML = `Question ${questNo} of  ${quiz.questions.length}`;
}
