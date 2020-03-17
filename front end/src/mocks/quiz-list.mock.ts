import { Quiz } from '../models/quiz.model';
import { QUESTION_ACTOR, QUESTION_SPORT} from './questions.mocks';

export const QUIZ_LIST: Quiz[] = [
  {
    name: 'Les Acteurs', // What's happening if I change this value..?
    theme: null,
    questions: [QUESTION_ACTOR],
    id: '1'
  },
  {
    name: 'Les Sports',
    questions: [QUESTION_SPORT],
    theme: null,
    id: '2'
  }
];
