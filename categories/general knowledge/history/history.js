// History//
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
        question: 'Who discovered penicillin?',
        choice1: 'Alexander Fleming',
        choice2: 'Martin Luther King',
        choice3: 'Frodo',
        choice4: 'Boris Johnson',
        answer: 1,
    },
    {
        question: 'Which year did the European Union first introduce the Euro as currency?',
        choice1: '2001',
        choice2: '2000',
        choice3: '1999',
        choice4: '1989',
        answer: 3,
    },
    {
        question: 'Divorced, beheaded, died, divorced, beheaded, survived, who was Henry VIII last wife?',
        choice1: 'Elizabeth',
        choice2: 'Marilyn Monroe',
        choice3: 'Catherine Parr',
        choice4: 'Diana Park',
        answer: 3,
    },
    {
        question: 'Which two houses were involved in the War of the Roses?',
        choice1: 'London, Elton',
        choice2: 'Edinburgh, Glasgow',
        choice3: 'Liverpool, New England',
        choice4: 'York, Lancaster',
        answer: 4,
    },
    {
        question: 'Queen Elizabeth II is the longest reigning monarch of the UK, followed by Queen Victoria, but who is third?',
        choice1: 'George Fleming',
        choice2: 'George III',
        choice3: 'Prince William',
        choice4: 'Robert II',
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

        return window.location.assign('history.html')
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