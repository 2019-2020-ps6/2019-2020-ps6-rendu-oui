const { Theme, Quiz } = require('../../../models')

const { NotFoundError } = require('../../../utils/errors/not-found-error')

const { filterQuestionsFromQuiz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')

/**
 * filterQuizzesFromTheme.
 * This function filters among the quizzes to return only the quiz linked with the given themeId.
 * @param themeId
 */
const filterQuizzesFromTheme = (themeId) => {
  const quizzes = Quiz.get()
  const parsedId = parseInt(themeId, 10)
  /*
  return quizzes.filter((quiz) => quiz.themeId === parsedId).map((quiz) => {
    const questions = filterQuestionsFromQuiz(quiz.id)
    const questionWithAnswers = questions.map((question) => {
      const answers = filterAnswersFromQuestion(question.id)
      return { ...question, answers }
    })
    return { ...quiz, questions: questionWithAnswers }
  }) */
  return quizzes.filter((quiz) => quiz.themeId === parsedId)
}

/**
 * getQuizFromtheme.
 * This function retrieves a quiz from a theme. It will throw a not found exception if the themeId in the quiz is different from the one provided in parameter.
 * @param themeId
 * @param quizId
 */
const getQuizFromTheme = (themeId, quizId) => {
  // Check if themeId exists, if not it will throw a NotFoundError
  const theme = Theme.getById(themeId)
  const themeIdInt = parseInt(themeId, 10)
  const quiz = Quiz.getById(quizId)

  if (quiz.themeId !== themeIdInt) throw new NotFoundError(`${quiz.name} id=${quizId} was not found for ${theme.name} id=${theme.id} : not found`)

  const questions = filterQuestionsFromQuiz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  return { ...quiz, questions: questionWithAnswers }
}

module.exports = {
  filterQuizzesFromTheme,
  getQuizFromTheme,
}
