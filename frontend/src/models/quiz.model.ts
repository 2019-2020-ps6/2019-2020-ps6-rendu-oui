import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    theme: Theme;
    questions: Question[];
    creationDate?: Date;
}

export enum Theme {
  Actor = 'Acteurs',
  Sport = 'Sports',
  Gastronomie = 'Gastronomie'
}
