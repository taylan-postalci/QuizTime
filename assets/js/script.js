const startBtn = document.getElementById('startBtn');

const questionEl = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

const scoreEl = document.getElementById('scoreEl');


var catNumber = 0;
var diffNumber = 0;
var score = 0;
var currentQuestion = 0;
var questionCounter = 1;
var correctAnswer = '';

// Generates whats question the user will recive based on catefory and difficulty selected
function generateQuiz() {
    var apiUrl = ""
    if (catNumber === 1 && diffNumber === 1) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";
    } else if (catNumber === 1 && diffNumber === 2) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple";
    } else if (catNumber === 1 && diffNumber === 3) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple";
    } else if (catNumber === 2 && diffNumber === 1) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";
    } else if (catNumber === 2 && diffNumber === 2) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple";
    } else if (catNumber === 2 && diffNumber === 3) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=17&difficulty=hard&type=multiple";
    } else if (catNumber === 3 && diffNumber === 1) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple";
    } else if (catNumber === 3 && diffNumber === 2) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple";
    } else if (catNumber === 3 && diffNumber === 3) {
        apiUrl = "https://opentdb.com/api.php?amount=10&category=23&difficulty=hard&type=multiple";
    }

    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayQuestion(data);
        });
      }
    })
};

// Function to display question to user
var displayQuestion = function(questions) {
    const q = questions.results[currentQuestion];

    questionEl.innerHTML =  q.question;
        
    var questionOrder = Math.floor(Math.random() * (5));

    if (questionOrder === 1) {
        answer1.textContent = q.incorrect_answers[0];
        answer2.textContent = q.incorrect_answers[1];
        answer3.textContent = q.incorrect_answers[2];
        answer4.textContent = q.correct_answer;
        correctAnswer = '4';
    } else if ( questionOrder === 2) {
        answer1.textContent = q.incorrect_answers[0];
        answer2.textContent = q.incorrect_answers[1];
        answer3.textContent = q.correct_answer;
        answer4.textContent = q.incorrect_answers[2];
        correctAnswer = '3';
    } else if ( questionOrder === 3) {
        answer1.textContent = q.incorrect_answers[0];
        answer2.textContent = q.correct_answer;
        answer3.textContent = q.incorrect_answers[1];
        answer4.textContent = q.incorrect_answers[2];
        correctAnswer = '2';
    } else {
        answer1.textContent = q.correct_answer;
        answer2.textContent = q.incorrect_answers[0];
        answer3.textContent = q.incorrect_answers[1];
        answer4.textContent = q.incorrect_answers[2];
        correctAnswer = '1';
    }
}

// Function to check if user selected correct answer
function checkAnswer(answer) {
    console.log(answer);
    console.log(correctAnswer);
    if (answer === correctAnswer) {
        score++;
        questionCounter++;
        setCounterText();
    } else {
        questionCounter++;
    }

    if (currentQuestion < questionCounter) {
        currentQuestion++;
        displayQuestion();
    }
}

// Category Selectory
function catSelector(category) {
    if (category === '1') {
        catNumber = 1;
    } else if (category === '2') {
        catNumber = 2;
    } else if (category === '3') {
        catNumber = 3;
    }
}

// Difficulty Selector
function diffSelector(difficulty) {
    if (difficulty === '1') {
        diffNumber = 1;
    } else if (difficulty === '2') {
        diffNumber = 2;
    } else if (difficulty === '3') {
        diffNumber = 3;
    }
}

// Function to display score on screen
function setCounterText() {
    scoreEl.textContent = score;
}

// Button to start the Quiz
startBtn.addEventListener("click", generateQuiz)
