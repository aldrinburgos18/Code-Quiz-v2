//questions
//array of questions and answers
const questions = [
  {
    question: "Commonly used data types DO Not Include:",
    answers: [
      { text: "1. strings", correct: false },
      { text: "2. booleans", correct: false },
      { text: "3. alerts", correct: true },
      { text: "4. numbers", correct: false },
    ],
  },
  {
    question:
      "The condition in an if/else statement is enclosed with ___________.",
    answers: [
      { option: "1. quotes", correct: false },
      { option: "2. curly brackets", correct: true },
      { option: "3. parenthesis", correct: false },
      { option: "4. square brackets", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store ___________.",
    answers: [
      { option: "1. numbers and strings", correct: false },
      { option: "2. other arrays", correct: false },
      { option: "3. booleans", correct: false },
      { option: "4. all of the above", correct: true },
    ],
  },
  {
    question:
      "String values must be enclosed within ___________ when being assigned to variables.",
    answers: [
      { option: "1. commas", correct: false },
      { option: "2. curly brackets", correct: false },
      { option: "3. quotes", correct: true },
      { option: "4. parenthesis", correct: false },
    ],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { option: "1. JavaScript", correct: false },
      { option: "2. terminal/bash", correct: false },
      { option: "3. for loops", correct: false },
      { option: "4. console.log", correct: true },
    ],
  },
];

//set variable for timer
var time = 76;
var timerEl = document.querySelector("#timer");
const timer = function () {
  setInterval(() => {
    time--;
    timerEl.innerHTML = time + " seconds remaining";
    if (time <= 0 || timer < 1) {
      timerEl.innerHTML = "Time's up!";
      //show high score
      //reset timer
    }
  }, 1000);
};

var pageContentEl = document.querySelector(".page-content");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz-page");
var startButton = document.getElementById("start-btn");

//set and shuffle questions
let shuffledQuestions, currentQuestionIndex;

var setNextQuestion = function () {
  //remove start page
  startPage.setAttribute("class", "hide");

  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

var showQuestion = function (question) {
  var questionEl = document.createElement("div");
  questionEl.setAttribute("id", "question");
  questionEl.innerText = question.question;
  quizPage.appendChild(questionEl);
};

var startQuiz = function () {
  //start countdown
  timer();

  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  //display questions
  setNextQuestion();
};

startButton.addEventListener("click", startQuiz);
