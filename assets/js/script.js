//array of questions and answers
const questions = [
  {
    question: "Commonly used data types DO Not Include:",
    answers: [
      { option: "1. strings", correct: false },
      { option: "2. booleans", correct: false },
      { option: "3. alerts", correct: true },
      { option: "4. numbers", correct: false },
    ],
  },
  {
    question:
      "The condition in an if/else statement is enclosed with ___________.",
    answers: [
      { option: "1. quotes", correct: false },
      { option: "2. curly brackets", correct: false },
      { option: "3. parenthesis", correct: true },
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

//set variable for high scores
var highscores = [];

let button, nextButtonEl, quizPageEl, statusEl, userName, score;

//set variable for timer
var time = 75,
  timer,
  counter = function () {
    time--;
    timerEl.innerHTML = time + " seconds remaining";
    timer = setTimeout(function () {
      counter();
    }, 1000);
    if (time <= 0 || timer < 1) {
      clearTimeout(timer);
      timerEl.innerHTML = "Time's up!";
      userName = prompt("The timer has ran out! Please enter your name:");
      saveHighScore(userName);
      highScorePage.appendChild(restartBtn);
    }
  };

var pageContent = document.querySelector(".page-content");
var timerEl = document.querySelector("#timer");
var startPage = document.querySelector("#start-page");
var quizPage = document.querySelector("#quiz-page");
var highScorePage = document.querySelector("#high-scores");
//buttons
var viewHighScoreBtn = document.getElementById("high-score-btn");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var restartBtn = document.createElement("button");
restartBtn.innerText = "Restart";

//set and shuffle questions
let shuffledQuestions, currentQuestionIndex;

var setNextQuestion = function () {
  //remove start page
  startPage.classList.add("hide");

  //display quiz page
  quizPage.classList.remove("hide");

  if (questions.length === currentQuestionIndex) {
    score = time;
    userName = prompt(
      `Congratulations! You have finished the quiz with a score of ${score}. Please enter your name`
    );
    saveHighScore(userName);
    highScorePage.appendChild(restartBtn);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
};

var showQuestion = function (question) {
  quizPageEl = document.createElement("section");

  var questionEl = document.createElement("div");
  questionEl.setAttribute("id", "question");
  questionEl.innerText = question.question;
  quizPageEl.appendChild(questionEl);

  var answersEl = document.createElement("div");
  answersEl.setAttribute("id", "answer-buttons");
  answersEl.classList.add("btn-grid");

  nextButtonEl = document.createElement("button");
  nextButtonEl.setAttribute("id", "next-btn");
  nextButtonEl.classList.add("next-btn", "hide");
  nextButtonEl.innerText = "Next";

  nextButtonEl.addEventListener("click", () => {
    currentQuestionIndex++;
    quizPage.removeChild(quizPageEl);
    counter();
    setNextQuestion();
  });

  question.answers.forEach((answer) => {
    //create button for each choices
    button = document.createElement("button");
    button.innerText = answer.option;
    button.setAttribute("id", "choices");
    button.classList.add("btn");
    //check if answer is correct
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersEl.appendChild(button);
    quizPageEl.appendChild(answersEl);
    quizPageEl.appendChild(nextButtonEl);
    quizPage.appendChild(quizPageEl);
  });
};

var selectAnswer = function (e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  var buttons = document.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  clearTimeout(timer);

  statusEl = document.createElement("div");
  statusEl.classList.add("indicator");
  if (!correct) {
    time -= 10;
    selectedButton.classList.add("wrong");
    nextButtonEl.classList.remove("hide");
    statusEl.innerText = "Incorrect!";
    quizPageEl.appendChild(statusEl);
    console.log(time);
  } else {
    nextButtonEl.classList.remove("hide");
    selectedButton.classList.add("correct");
    statusEl.innerText = "Correct!";
    quizPageEl.appendChild(statusEl);
  }
};

var showHighScore = function () {
  //clear page
  quizPage.classList.add("hide");
  startPage.classList.add("hide");

  //stop timer
  clearTimeout(timer);
  timerEl.innerHTML = "";

  //display high score page
  highScorePage.classList.remove("hide");
  if (restartBtn) {
    restartBtn.addEventListener("click", startQuiz);
  }
  restartBtn.innerText = "Start quiz";
  highScorePage.appendChild(restartBtn);
};

var saveHighScore = function (userName) {
  highscores.push({ name: userName, score: score });
  console.log(highscores);
  showHighScore();
};

var startQuiz = function () {
  //start countdown
  time = 75;
  counter();

  //remove start page
  startPage.classList.add("hide");
  highScorePage.classList.add("hide");

  //suffle questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;

  //display questions
  setNextQuestion();
};

startButton.addEventListener("click", startQuiz);
viewHighScoreBtn.addEventListener("click", showHighScore);
