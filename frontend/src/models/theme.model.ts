import { Quiz } from './quiz.model';

export interface Theme {
  id: string;
  name: string;
  quizzes: Quiz[];
}
