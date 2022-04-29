// Culture //
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
        question: 'What nationality was the artist Frida Kahlo?',
        choice1: 'Mexican',
        choice2: 'Dominican',
        choice3: 'Ukranian',
        choice4: 'Spanish',
        answer: 1,
    },
    {
        question: 'What is the currency of Denmark?',
        choice1: 'Pesos',
        choice2: 'Euro',
        choice3: 'Krone',
        choice4: 'Dollar',
        answer: 3,
    },
    {
        question: 'The Royal Concertgebouw Orchestra is a symphony orchestra based in which European city?',
        choice1: 'Madrid',
        choice2: 'Naples',
        choice3: 'Amsterdam',
        choice4: 'Paris',
        answer: 3,
    },
    {
        question: 'The Goose Fair is an annual event in which English city?',
        choice1: 'London',
        choice2: 'New Castle',
        choice3: 'Liverpool',
        choice4: 'Nottingham',
        answer: 4,
    },
    {
        question: 'How many keys are there on a piano?',
        choice1: '98',
        choice2: '88',
        choice3: '90',
        choice4: '100',
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

        return window.location.assign('culture.html')
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
        }, 1000)
    })
})

increaseScore = num => {
    score += num
    scoreText.innerText = score
}

startQuiz()