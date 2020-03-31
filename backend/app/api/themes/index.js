const { Router } = require('express')

const { Theme } = require('../../models')
const { buildTheme, buildThemes } = require('./manager')

const QuizzesRouter = require('./quizzes')

const router = new Router()
router.use('/:themeId/quizzes', QuizzesRouter)

router.get('/', (req, res) => {
  try {
    const themes = buildThemes()
    res.status(200).json(themes)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:themeId', (req, res) => {
  try {
    console.log('Params get with id (index theme) :', req.params)
    const theme = buildTheme(req.params.themeId)
    res.status(200).json(theme)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const theme = Theme.create({ ...req.body })
    res.status(201).json(theme)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:themeId', (req, res) => {
  try {
    res.status(200).json(Theme.update(req.params.themeId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:themeId', (req, res) => {
  try {
    res.status(200).json(Theme.delete(req.params.themeId))
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
