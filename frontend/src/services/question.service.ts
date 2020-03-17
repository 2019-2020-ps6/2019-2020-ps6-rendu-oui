import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[];
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  constructor() {
  }

  addQuestion(question: Question, quiz: Quiz) {
    quiz.questions.push(question);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    quiz.questions.splice(this.questions.indexOf(question), 1);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
  }
}
