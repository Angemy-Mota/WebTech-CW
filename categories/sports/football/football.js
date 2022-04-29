// Football//
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
        question: 'Liverpool striker Fernando Torres represented which hotly tipped country?',
        choice1: 'Spain',
        choice2: 'Portugal',
        choice3: 'France',
        choice4: 'Italy',
        answer: 1,
    },
    {
        question: 'Striker Colin-Kazim Richards was in the squad for which team?',
        choice1: 'Greece',
        choice2: 'Spain',
        choice3: 'Turkey',
        choice4: 'Croatia',
        answer: 3,
    },
    {
        question: 'Midfielder Florentin Petre featured for which European country?',
        choice1: 'Spain',
        choice2: 'Austria',
        choice3: 'Romania',
        choice4: 'France',
        answer: 3,
    },
    {
        question: 'What is Lionel Messi Country of Origin?',
        choice1: 'Italy',
        choice2: 'Brazil',
        choice3: 'Spain',
        choice4: 'Argentina',
        answer: 4,
    },
    {
        question: 'How many languages can Neymar speak?',
        choice1: 'Portuguese and Spanish',
        choice2: 'Portuguese and English',
        choice3: 'Spanish and English',
        choice4: 'Russian and English',
        answer: 1,
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

        return window.location.assign('football.html')
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