const { Router } = require('express')
const { Answer } = require('../../../../../models')

const { getQuestionFromQuiz } = require('../manager')
const { filterAnswersFromQuestion, getAnswerFromQuestion } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    console.log('Params get (index answer) :', req.params)
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answers = filterAnswersFromQuestion(question.id)
    res.status(200).json(answers)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:answerId', (req, res) => {
  try {
    console.log('Params get with id (index answer) :', req.params)
    const answer = getAnswerFromQuestion(req.params.quizId, req.params.questionId, req.params.answerId)
    res.status(200).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    console.log('Params post (index answer) :', req.params)
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const answer = Answer.create({ ...req.body, questionId: question.id })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})


module.exports = router
