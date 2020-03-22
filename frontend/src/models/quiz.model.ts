import { Question } from './question.model';

export interface Quiz {
    name: string;
    theme: Theme;
    questions: Question[];
    creationDate?: Date;
    id?: string;
}

export enum Theme {
  Actor = 'Acteurs',
  Sport = 'Sports',
  Gastronomie = 'Gastronomie'
}
