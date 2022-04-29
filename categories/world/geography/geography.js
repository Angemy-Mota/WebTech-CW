// Geography//
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
        question: 'What is the capital city of Australia?',
        choice1: 'Canberra',
        choice2: 'Melbourne',
        choice3: 'Santiago',
        choice4: 'York',
        answer: 1,
    },
    {
        question: 'Which UK city is situated further west?',
        choice1: 'Bristol',
        choice2: 'Manchester',
        choice3: 'Edinburgh',
        choice4: 'Leeds',
        answer: 3,
    },
    {
        question: 'What is the capital of Finland?',
        choice1: 'Oulu',
        choice2: 'Turku',
        choice3: 'Helsinki',
        choice4: 'Tampere',
        answer: 3,
    },
    {
        question: 'What language is spoken in Brazil?',
        choice1: 'Spanish',
        choice2: 'French',
        choice3: 'Creole',
        choice4: 'Portuguese',
        answer: 4,
    },
    {
        question: 'What is the capital of Canada?',
        choice1: 'Ontario',
        choice2: 'Ottawa',
        choice3: 'Victoria',
        choice4: 'Quebec',
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

        return window.location.assign('geography.html')
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