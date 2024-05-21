

let score = 0, databank, questions; 
// show question number
let questionNumber = 0;

const question = document.getElementById('question');
const options = document.getElementById('options');
const scoreBoard = document.getElementById('current-score');
scoreBoard.innerHTML = `Score: ${score}`;
const questionNos = document.getElementById('current-question');
const progress = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

function shuffle(array) 
{
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

fetch('./databank.json')
    .then(response => response.json())
    .then(data => {
        databank = data;
        questions = shuffle(databank.questions);
        questionNos.innerHTML = `Question: ${questionNumber + 1}/${questions.length}`;
        showQuestion();
    })
    .catch(error => console.error('Error:', error));

// show question
function showQuestion() {
    question.innerHTML = questions[questionNumber].question;
    showOptions();
}
// show options
function showOptions() {
    options.innerHTML = '';
    for (let i = 0; i < questions[questionNumber].options.length; i++) {
        const option = document.createElement('button');
        option.innerHTML = questions[questionNumber].options[i];
        option.className = 'option';
        option.addEventListener('click', checkAnswer);
        options.appendChild(option);
    }
}
// check answer
function checkAnswer() 
{
    // Display Animations for Correct and Incorrect Answers

    if (this.innerHTML === questions[questionNumber].answer) {
        score++;
        scoreBoard.innerHTML = `Score: ${score}`;
        this.style.backgroundColor = 'green'; // add pause before moving to next question
    }
    else 
    {
        this.style.backgroundColor = 'red'; // add pause before moving to next question    
    }
    setTimeout(nextQuestion, 500);
}
function nextQuestion()
{
    questionNumber++;
    if(questionNumber < questions.length)
    {
        handleprogress();
        showQuestion();
        questionNos.innerHTML = `Question: ${questionNumber + 1}/${questions.length}`;
    }
    else
    {
        window.location.href = `score.html?score=${score}`;
    }
}
// show score
function showScore() 
{
    question.innerHTML = `Your score: ${score}/${questions.length}`;
    options.innerHTML = '';
}
function handleprogress()
{
    let percent = (questionNumber + 1) / questions.length * 100;
    progressBar.style.width = `${percent}%`;
    // progressBar.innerHTML = `${percent}%`;
}
// Path: index.html