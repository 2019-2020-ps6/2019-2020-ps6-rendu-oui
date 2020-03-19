import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';

import {Question} from '../models/question.model';
import {Quiz} from '../models/quiz.model';

import {httpOptionsBase, serverUrl} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[];
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor( private http: HttpClient ) {
  }

  addQuestion(question: Question, quiz: Quiz) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }
}
