const errorhomeBtn = document.getElementById('errorhomeBtn');

const questionEl = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');

const scoreEl = document.getElementById('scoreEl');
const finalscoreEl = document.getElementById('finalscoreEl');


var catNumber = 0;
var diffSelect = '';
var score = 0;
var currentQuestion = 0;
var questionCounter = 1;
var correctAnswer = '';
var questionArray = [];

// Generates whats question the user will recive based on catefory and difficulty selected
function generateQuiz() {
    var apiUrl = "https://opentdb.com/api.php?amount=10&category=" + catNumber + "&difficulty=" + diffSelect + "&type=multiple"
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {

            if (data.response_code === 1) {
                console.log('ERROR MESSAGE');
                document.getElementById("errorPage").style.display = "block";
            } else {
                console.log(data);
                questionArray = data;
                displayQuestion(questionArray);

            }
        });
      }
    })
};

// Function to display question to user
var displayQuestion = function() {
    document.getElementById("quizPage").style.display = "block";

    if (questionCounter > 10) {
        setfinalScore();    
    }
    var q = questionArray.results[currentQuestion];
  
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
    if (answer === correctAnswer) {
        score=score+10;
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
        catNumber = 9;
    } else if (category === '2') {
        catNumber = 10;
    } else if (category === '3') {
        catNumber = 11;
    } else if (category === '4') {
        catNumber = 12;
    } else if (category === '5') {
        catNumber = 13;
    } else if (category === '6') {
        catNumber = 14;
    } else if (category === '7') {
        catNumber = 15;
    } else if (category === '8') {
        catNumber = 16;
    } else if (category === '9') {
        catNumber = 17;
    } else if (category === '10') {
        catNumber = 18;
    } else if (category === '11') {
        catNumber = 19;
    } else if (category === '12') {
        catNumber = 20;
    } else if (category === '13') {
        catNumber = 21;
    } else if (category === '14') {
        catNumber = 22;
    } else if (category === '15') {
        catNumber = 23;
    } else if (category === '16') {
        catNumber = 24;
    } else if (category === '17') {
        catNumber = 25;
    } else if (category === '18') {
        catNumber = 26;
    } else if (category === '19') {
        catNumber = 27;
    } else if (category === '20') {
        catNumber = 28;
    } else if (category === '21') {
        catNumber = 29;
    } else if (category === '22') {
        catNumber = 30;
    } else if (category === '23') {
        catNumber = 31;
    } else if (category === '24') {
        catNumber = 32;
    }

    document.getElementById("catPage").style.display = "none";
    document.getElementById("diffPage").style.display = "block";
}

// Difficulty Selector
function diffSelector(difficulty) {
    if (difficulty === '1') {
        diffSelect = 'easy';
    } else if (difficulty === '2') {
        diffSelect = 'medium';
    } else if (difficulty === '3') {
        diffSelect = 'hard';
    } 
    document.getElementById("catPage").style.display = "none";
    document.getElementById("diffPage").style.display = "none";
    generateQuiz();
}

// Function to display score on screen
function setCounterText() {
    scoreEl.textContent = score;
}

function setfinalScore() {
    finalscoreEl.textContent = score;
    document.getElementById("quizPage").style.display = "none";
    document.getElementById("finalPage").style.display = "block";
}

errorhomeBtn.onclick = function() {
    location.reload();
}
