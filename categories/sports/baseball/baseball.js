// Baseball//
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choices-text'))
const progressTextbar = document.querySelector('#quiz-progress-text')
const scoreText = document.querySelector('#score')
const quizProgressBarFull = document.querySelector('#quiz-progress-bar-full')

let currentQuestion = {}
let acceptAnswer = true
let score = 0
let questionCount = 0
let questionlist = []

let questions = [
    {
        question: 'This Hall of Fame great was the first-ever Yankee to have his baseball number retired. It was the number 4. Who is he?',
        choice1: 'Lou Gehrig',
        choice2: 'Alex Rodriguez',
        choice3: 'Joe Mauer',
        choice4: 'Joe Torre',
        answer: 1,
    },
    {
        question: 'Which team won their 27th World Series in 2009?',
        choice1: 'Los Angeles Dodgers',
        choice2: 'San Diego Padres',
        choice3: 'New York Yankees',
        choice4: 'Florida Marlins',
        answer: 3,
    },
    {
        question: 'What is the game format for World Series play?',
        choice1: 'A one game series',
        choice2: 'Best of five games',
        choice3: 'Best of seven games',
        choice4: 'First two wins gets the crown',
        answer: 3,
    },
    {
        question: 'Hall of Fame player Ty Cobb had which nickname?',
        choice1: 'The Louisville',
        choice2: 'Baltimore Banana',
        choice3: 'Detroit Dog',
        choice4: 'Georgia Peach',
        answer: 4,
    },
    {
        question: 'Which Boston Red Sox outfielder was the first player in Boston to bat for the Triple Crown Award?',
        choice1: 'Willie McCovey',
        choice2: 'Ted Williams',
        choice3: 'Tim Wakefields',
        choice4: 'Roger Clemens',
        answer: 2,
    },
]

const POINTS = 20
const MAX_QUESTIONS = 5

startQuiz = () => {
    questionCount = 0
    score = 0
    questionlist = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (questionlist.length === 0 || questionCount > MAX_QUESTIONS) {
        localStorage.setItem('ResentScore', score)

        return window.location.assign('baseball.html')
    }

    questionCount++
    progressTextbar.innerText = `Question ${questionCount} of ${MAX_QUESTIONS}`
    quizProgressBarFull.style.width = `${(questionCount/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * questionlist.length)
    currentQuestion = questionlist[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
    })

    questionlist.splice(questionsIndex, 1)

    acceptAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptAnswer) return

        acceptAnswer = false
        const yourChoice = e.target
        const yourAnswer = yourChoice.dataset['number']

        let applyClass = yourAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(applyClass === 'correct') {
            increaseScore(POINTS)
        }

        yourChoice.parentElement.classList.add(applyClass)

        setTimeout(() => {
            yourChoice.parentElement.classList.remove(applyClass)
            getNewQuestion()
        }, 500)
    })
})

increaseScore = num => {
    score += num
    scoreText.innerText = score
}
startQuiz()