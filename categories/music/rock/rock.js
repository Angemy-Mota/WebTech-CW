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
        question: 'Which member of The Beatles later joined The Traveling Wilburys?',
        choice1: 'George Harrison',
        choice2: 'Ringo Starr',
        choice3: 'John Lenon',
        choice4: 'Paul McCartney',
        answer: 1,
    },
    {
        question: 'Which band pioneered the art of instrument smashing?',
        choice1: 'AD/DC',
        choice2: 'The Sex Pistols',
        choice3: 'The Who',
        choice4: 'Rush',
        answer: 3,
    },
    {
        question: 'What instrument does Neil Peart play?',
        choice1: 'Keyboard',
        choice2: 'Bass',
        choice3: 'Drums',
        choice4: 'Guitar',
        answer: 3,
    },
    {
        question: 'Queen performs the song "Under Pressure" with which famous solo artist?',
        choice1: 'Elton John',
        choice2: 'Peter Frampton',
        choice3: 'Bob Seger',
        choice4: 'David Bowie',
        answer: 4,
    },
    {
        question: 'What is Led Zeppelins longest studio recorded track?',
        choice1: 'Stairway to Heaven',
        choice2: 'In My Time of Dying',
        choice3: 'Carouselambra',
        choice4: 'Moby Dick',
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

        return window.location.assign('rock.html')
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