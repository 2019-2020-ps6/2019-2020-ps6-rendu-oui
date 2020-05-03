const { Quiz, Question } = require('../../../../models')

const { NotFoundError } = require('../../../../utils/errors/not-found-error')

const { filterAnswersFromQuestion } = require('./answers/manager')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * filterQuestionsFromQuiz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterQuestionsFromQuiz = (quizId) => {
  const questions = Question.get()
  const parsedId = parseInt(quizId, 10)
  /*
  return questions.map(() => {
    const question = questions.filter((q) => q.quizId === parsedId)
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })

  const question = questions.filter((question) => question.quizId === parsedId)
  const answers = filterAnswersFromQuestion(question.id)
  return { ...question, answers } */
  return questions.filter((question) => question.quizId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the quizId in the question is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 */
const getQuestionFromQuiz = (quizId, questionId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = Quiz.getById(quizId)
  const quizIdInt = parseInt(quizId, 10)
  const question = Question.getById(questionId)
  console.log('question (manager question) :', question)

  if (question.quizId !== quizIdInt) throw new NotFoundError(`${question.name} id=${questionId} was not found for ${quiz.name} id=${quiz.id} : not found`)

  const answers = filterAnswersFromQuestion(question.id)
  return { ...question, answers }
}

module.exports = {
  filterQuestionsFromQuiz,
  getQuestionFromQuiz,
}
