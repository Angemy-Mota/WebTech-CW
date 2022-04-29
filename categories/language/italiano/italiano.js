// Italiano//
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
        question: 'How would you write "a very nice friend"?',
        choice1: 'Un amico molto caro',
        choice2: 'Un edificio alto',
        choice3: 'Un uomo molto vecchio',
        choice4: 'Un albero verde',
        answer: 1,
    },
    {
        question: 'Which one of the following means "square"?',
        choice1: 'Circulare',
        choice2: 'Triangulare',
        choice3: 'Quadrato',
        choice4: 'Profondo',
        answer: 3,
    },
    {
        question: 'Which one of the following means "red"?',
        choice1: 'Giallo',
        choice2: 'Bianco',
        choice3: 'Rosso',
        choice4: 'Nero',
        answer: 3,
    },
    {
        question: 'Which one of the following means the number "six"?',
        choice1: 'Tre',
        choice2: 'Nove',
        choice3: 'Sette',
        choice4: 'Sei',
        answer: 4,
    },
    {
        question: 'What is "nose" in Italian?',
        choice1: 'Spalla',
        choice2: 'Naso',
        choice3: 'Cuore',
        choice4: 'Orecchio',
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

        return window.location.assign('italiano.html')
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