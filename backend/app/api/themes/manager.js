const { Theme } = require('../../models')

const { filterQuizzesFromTheme } = require('./quizzes/manager')
const { filterQuestionsFromQuiz } = require('./quizzes/questions/manager')
const { filterAnswersFromQuestion } = require('./quizzes/questions/answers/manager')

/**
 * Function buildTheme.
 * This function aggregates the quizzes and questions from the database to build a theme with all the data needed by the clients.
 * @param themeId
 */
const buildTheme = (themeId) => {
  const theme = Theme.getById(themeId)
  const quizzes = filterQuizzesFromTheme(theme.id)
  const quizWithQuestionsAndAnswers = quizzes.map((quiz) => {
    const questions = filterQuestionsFromQuiz(quiz.id)
    const questionWithAnswers = questions.map((question) => {
      const answers = filterAnswersFromQuestion(question.id)
      return { ...question, answers }
    })
    return { ...quiz, questions: questionWithAnswers }
  })
  return { ...theme, quizzes: quizWithQuestionsAndAnswers }
}

/**
 * Function buildThemes.
 * This function aggregates the quizzes and questions from the database to build entire themes.
 */
const buildThemes = () => {
  const themes = Theme.get()
  return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
  buildTheme,
  buildThemes,
}
