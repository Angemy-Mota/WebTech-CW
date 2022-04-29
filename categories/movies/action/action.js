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
        question: 'Name of the actor that plays John Wick?',
        choice1: 'Keanu Reeves',
        choice2: 'John Travolta',
        choice3: 'Vin Diesel',
        choice4: 'Johnny Deep',
        answer: 1,
    },
    {
        question: 'When was the first Rambo movie released?',
        choice1: '1980',
        choice2: '1995',
        choice3: '1982',
        choice4: '1992',
        answer: 3,
    },
    {
        question: 'Who performed the theme song for the upcoming James Bond movie No Time to Die?',
        choice1: 'John Lenon',
        choice2: 'Michael Jackson',
        choice3: 'Billie Eilish',
        choice4: 'Paris Hilton',
        answer: 3,
    },
    {
        question: 'What movie is the line "I will look for you, I will find you, and I will kill you" from?',
        choice1: 'RoboCop',
        choice2: 'Lord of the rings',
        choice3: 'Die Hard',
        choice4: 'Taken',
        answer: 4,
    },
    {
        question: 'What was Jason Bourne real name?',
        choice1: 'Michael Angelo',
        choice2: 'David Webb',
        choice3: 'Marc Cuban',
        choice4: 'Tom Cruise',
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

        return window.location.assign('action.html')
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