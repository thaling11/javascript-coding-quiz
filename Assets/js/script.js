//variables
let score = 75;
const startButton = document.getElementById("start-button");
let countDown = document.querySelector("#timer-display");
let welcome = document.querySelector(".welcome");
let qs = document.getElementById("qs");
let as = document.getElementById("as");
let timer = document.createElement("p");
let quiz = document.getElementById("quiz");
let question = document.createElement("p");
let ans1 = document.createElement("li");
let choiceButtons = document.getElementById("answer-buttons");
let highscores = document.querySelector(".highscores");
let returnbtn = document.querySelector("#return-button");
let submitButton = document.querySelector("#submit-button");
let nameInput = document.querySelector("#name-input");
const yourHighScore = document.querySelector("#your-highscore");
let highscoresLink = document.querySelector(".viewHighScores");
let highscoresList = document.querySelector("#highscores-list");
let highscoresCountSpan = document.querySelector("#highscores-count");
let resetButton = document.querySelector("#reset-button");
let hsInput = [];


//question and answer options
let questionNumber = 0;
const questions = [
  {
    question: "Commonly used data types do not include:",
    choices: ["strings", "booleans", "numbers", "alert"],
    answer: "alert",
  },
  {
    question: "Javascript is a ______ language?",
    choices: [
      "Object-oriented",
      "Object based",
      "Procedural",
      "None of the above",
    ],
    answer: "Object-oriented",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    choices: [
      "getElementbyId()",
      "getElementsByClassName()",
      "querySelector",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "How can you get the type of arguments passed to a function?",
    choices: [
      "Using 'typeof' operator",
      "Using 'getType' function",
      "Both of the above",
      "None of the above",
    ],
    answer: "Using 'typeof' operator",
  },
];

//START GAME FUNCTION
function restartGame() {
  questionNumber = 0;
  nowQuestion = 0;
  score = 75;
  timer.textContent = "Time: " + score;
  // countDown.appendChild(timer);
  highscores.setAttribute("style", "display: none;");
};

//countdown loop- doesn't go below 0
function startTimer() {
  let timerInterval = setInterval(function () {
    if (score > 0) {
      score--;
      timer.textContent = "Time: " + score;
      countDown.appendChild(timer);
    } else {
      clearInterval(timerInterval);
      endGame(); //endGame() here
    }
  }, 1000);
};

//hide start button, display first question
function questionDisplay() {
  startTimer();
  if (questionNumber < questions.length) {
    as.innerHTML = "";
    qs.innerHTML = "";
    currentQuestion = questions[questionNumber];
    console.log(currentQuestion);
    quiz.setAttribute("style", "display: flex;");

    question.textContent = currentQuestion.question;
    for (let index = 0; index < questions.length; index++) {
      let choice = currentQuestion.choices[index];
      let buttons = document.createElement("button");
      buttons.setAttribute("value", choice);
      buttons.setAttribute("class", "answer-buttons");
      buttons.textContent = index + 1 + ". " + choice;
      as.appendChild(buttons);
      qs.appendChild(question);
    }
    questionNumber++; //will want to set back to 0
  } else {
    endScore = score;
    score = 0;
    // startTimer();
  }
}

//Check answer
let nowQuestion = 0;
as.addEventListener("click", function (event) {
  console.log(event.target.nodeName);
  if (event.target.nodeName === "BUTTON") {
    if (event.target.value === questions[nowQuestion].answer) {
      console.log("hello");
      nowQuestion++;
      questionDisplay();
    } else {
      // subtract time
      score = score - 15;
      nowQuestion++;
      questionDisplay();
    }
  }
});

//end game score
function endGame() {
  quiz.setAttribute("style", "display: none;");
  highscores.setAttribute("style", "display: block; text-align: center;");
  let scoreEl = document.querySelector(".player-score")
  let playerScore = endScore;
  scoreEl.textContent = playerScore;
}


//creates highscores list as <li> elements
function showHighscores() {
  highscoresList.innerHTML = "";
  highscoresCountSpan.textContent = hsInput.length;

  for (var i = 0; i < hsInput.length; i++) {
    console.log(hsInput, 157);
    var hsList = hsInput[i].name;
    var hsName = hsInput[i].score;
    var li = document.createElement("li");
    li.textContent = hsList + " " + " " + hsName;
    li.setAttribute("data-index", i);

    highscoresList.appendChild(li);
  }
}


function init() {
  var storedHighscores = JSON.parse(localStorage.getItem("hsInput"));
  if (storedHighscores !== null) {
    hsInput = storedHighscores;
  }
  showHighscores();
}

function storeHighscores() {
  localStorage.setItem("hsInput", JSON.stringify(hsInput));
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var nameText = nameInput.value;
  let scoreEl = document.querySelector(".player-score")
  let playerScore = scoreEl.textContent;
  console.log(playerScore);
  if (nameText === "") {
    return;
  }
  hsInput.push({name: nameText, score: playerScore});
  hsInput.sort((firstItem, secondItem) => secondItem.score - firstItem.score);
  nameInput.value = "";
  showHighscores();
  storeHighscores();
});

init();

//reset highscore board
resetButton.addEventListener("click", function () {
  localStorage.removeItem("hsInput");
  hsInput = [];
  highscoresList.innerHTML = "";
  highscoresCountSpan.textContent = hsInput.length;
});

//clear page div .welcome cleared -HTML div nav-container and button element
startButton.addEventListener("click", function () {
  welcome.setAttribute("style", "display: none;");
  // startTimer();
  questionDisplay();
});

//return to homepage
returnbtn.addEventListener("click", function () {
  welcome.setAttribute("style", "display: block;");
  highscores.setAttribute("style", "visibiity:hidden;");
  restartGame();
});

highscoresLink.addEventListener("click", function () {
  welcome.setAttribute("style", "display: none;");
  highscores.setAttribute("style", "display: block; text-align: center;");
  quiz.setAttribute("style", "display: none;");
  nameInput.setAttribute("style", "display: none;");
  submitButton.setAttribute("style", "display: none;");
  yourHighScore.setAttribute("style", "display: none;");
})