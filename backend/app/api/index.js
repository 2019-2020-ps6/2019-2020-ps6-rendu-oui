const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const  User  = require('./user')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/user', User)

module.exports = router