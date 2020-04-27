const { Router } = require('express')

const { /* Answer, */ Quiz, Question } = require('../../../../models')
const { filterQuestionsFromQuiz, getQuestionFromQuiz } = require('./manager')

const manageAllErrors = require('../../../../utils/routes/error-management')

const AnswersRouter = require('./answers')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    console.log('Params get (index question) :', req.params)
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuiz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    console.log('Params get with id (index question) :', req.params)
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    console.log('Params post (index question) :', req.params)
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    const question = Question.create({ label: req.body.label, quizId })
    console.log('réponses ', question.answers)
    /* If answers have been provided in the request, we create the answer and update the response to send.
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => Answer.create({ ...answer, questionId: question.id }))
      question = { ...question, answers }
    } */
    res.status(201).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)
module.exports = router
