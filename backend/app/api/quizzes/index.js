const { Router } = require('express')

const { Quiz } = require('../../models')

const QuestionsRouter = require('./questions')

const { buildQuiz, buildQuizzes } = require('./manager.js')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    console.log(req.body)
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    console.log(req.params.quizId)
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    console.log(req.params.quizId)
    const quiz = buildQuiz(req.params.quizId)
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  console.log('Quiz add back :', req.body)
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:quizId/questions', QuestionsRouter)
module.exports = router
