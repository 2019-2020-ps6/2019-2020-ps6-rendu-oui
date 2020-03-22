import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';

import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject<Quiz>();

  private url = serverUrl + '/quizzes'; // 'https://api.myjson.com/bins/13ajhy';
  private questionsPath = '/questions';
  private httpOptions = httpOptionsBase;

  constructor( private http: HttpClient ) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.url).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.url, quiz, this.httpOptions).subscribe(() => {
      this.setQuizzesFromUrl();
      console.log('Quiz ajouté :', quiz);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.url + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  getQuiz(id: number): Observable<Quiz> {
    const urlWithId = this.url + '/' + id;
    return this.http.get<Quiz>(urlWithId);
  }

  addQuestion(question: Question, quiz: Quiz) {
    const questionUrl = this.url + '/' + quiz.id + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quiz.id);
      console.log('Question ajoutée :', question);
    });
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    const questionUrl = this.url + '/' + quiz.id + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.url + '/' + quizId;

    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
      console.log('Quiz après modification :', quiz);
    });
  }
}
