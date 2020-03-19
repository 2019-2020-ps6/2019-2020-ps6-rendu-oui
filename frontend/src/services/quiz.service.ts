import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

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

  private url = serverUrl + '/quizzes'; // 'https://api.myjson.com/bins/13ajhy';
  private httpOptions = httpOptionsBase;

  constructor( private http: HttpClient ) {
    this.getQuizzesFromUrl();
  }

  getQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.url).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.url, quiz, this.httpOptions).subscribe(() => this.getQuizzesFromUrl());
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.url + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.getQuizzesFromUrl());
  }

  getQuiz(id: number): Observable<Quiz> {
    const urlWithId = this.url + '/' + id;
    return this.http.get<Quiz>(urlWithId);
  }
}
