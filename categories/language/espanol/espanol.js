// Espanol//
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
        choice1: 'Un amigo muy agradable',
        choice2: 'Un edificio alto',
        choice3: 'Un hombre viejo',
        choice4: 'Un tiempo agradable',
        answer: 1,
    },
    {
        question: 'Which one of the following means "square"?',
        choice1: 'Circular',
        choice2: 'Triangulo',
        choice3: 'Cuadrado',
        choice4: 'Dulce',
        answer: 3,
    },
    {
        question: 'Which one of the following means "red"?',
        choice1: 'Amarillo',
        choice2: 'Blanco',
        choice3: 'Rojo',
        choice4: 'Azul',
        answer: 3,
    },
    {
        question: 'Which one of the following means the number "six"?',
        choice1: 'Tres',
        choice2: 'Cinco',
        choice3: 'Siete',
        choice4: 'Seis',
        answer: 4,
    },
    {
        question: 'What is "nose" in Spanish?',
        choice1: 'Hombro',
        choice2: 'Nariz',
        choice3: 'Corazon',
        choice4: 'Oreja',
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

        return window.location.assign('espanol.html')
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