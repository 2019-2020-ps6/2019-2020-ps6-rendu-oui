const { Router } = require('express')

const { Theme, Quiz, Question } = require('../../../models')
const { filterQuizzesFromTheme, getQuizFromTheme } = require('./manager')

const QuestionsRouter = require('./questions')
const ResultsRouter = require('./questionsResults')

const router = new Router({ mergeParams: true })
router.use('/:quizId/questions', QuestionsRouter)
router.use('/:quizId/results/questions', ResultsRouter)

router.get('/', (req, res) => {
  try {
    console.log('Params get (index quiz) :', req.params)
    Theme.getById(req.params.themeId)
    res.status(200).json(filterQuizzesFromTheme(req.params.themeId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    console.log('Params get with id (index quiz) :', req.params)
    const quiz = getQuizFromTheme(req.params.themeId, req.params.quizId)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if themeId exists, if not it will throw a NetFoundError
    console.log('Params post (index quiz) :', req.params)
    Theme.getById(req.params.themeId)
    const themeId = parseInt(req.params.themeId, 10)
    let quiz = Quiz.create({ name: req.body.name, themeId })
    // If questions have been provided in the request, we can create the questions and update the response to send
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = req.body.questions.map((question) => Question.create({ ...question, quizId: quiz.id }))
      quiz = { ...quiz, questions }
    }
    res.status(201).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    const quiz = getQuizFromTheme(req.params.themeId, req.params.quizId)
    const updatedQuiz = Quiz.update(req.params.quizId, { name: req.body.name, themeId: quiz.themeId })
    res.status(200).json(updatedQuiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
