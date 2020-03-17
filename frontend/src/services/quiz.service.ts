import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Quiz } from '../models/quiz.model';

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
  private url = 'https://api.myjson.com/bins/13ajhy'; // 'https://api.myjson.com/bins/silu2';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor( private http: HttpClient ) {
    this.getQuizzesFromUrl();
  }

  getQuizzesFromUrl() {
    this.http.get<{quizzes: Quiz[]}>(this.url).subscribe( (quizzes) => {
      this.quizzes = quizzes.quizzes;
      this.quizzes$.next(this.quizzes);
      console.log(quizzes);
    });
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes = this.quizzes.filter((q: Quiz) => q !== quiz);
    this.quizzes$.next(this.quizzes);
  }

  getQuiz(id: number): Observable<Quiz> {
    return of(this.quizzes.find(quiz => quiz.id === String(id)));
  }
}
