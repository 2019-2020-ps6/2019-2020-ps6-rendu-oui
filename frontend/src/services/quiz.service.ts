import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Quiz        } from '../models/quiz.model';
import { Theme       } from '../models/theme.model';
import { Question    } from '../models/question.model';

import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of themes.
   * The list can be retrieved from the mock.
   */
  private themes: Theme[];
  /**
   * Observable which contains the list of the themes.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);

  public themeSelected$: Subject<Theme> = new Subject<Theme>();
  public quizSelected$: Subject<Quiz> = new Subject<Quiz>();

  private url = serverUrl + '/themes';
  private quizzesPath = '/quizzes';
  private questionsPath = '/questions';
  private httpOptions = httpOptionsBase;

  constructor( private http: HttpClient, private router: Router) {
    this.setThemesFromUrl();
  }

  /*********************************************************************************************************************
   *        THEME                                                                                                      *
   ********************************************************************************************************************/

  setThemesFromUrl() {
    this.http.get<Theme[]>(this.url).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
  }

  addTheme(theme: Theme) {
    this.http.post<Theme>(this.url, theme, this.httpOptions).subscribe((themeCreate) => this.setThemesFromUrl());
  }

  deleteTheme(theme: Theme) {
    const urlWithId = this.url + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  }

  getTheme(id: number): Observable<Theme> {
    const urlWithId = this.url + '/' + id;
    return this.http.get<Theme>(urlWithId);
  }

  setSelectedTheme(themeId: string) {
    const urlWithId = this.url + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      this.themeSelected$.next(theme);
      console.log('Thème sélectionné :', theme);
    });
  }

  /*********************************************************************************************************************
   *        QUIZ                                                                                                       *
   ********************************************************************************************************************/

  addQuiz(quiz: Quiz, theme: Theme) {
    const quizUrl = this.url + '/' + theme.id + this.quizzesPath;
    this.http.post<Quiz>(quizUrl, quiz, this.httpOptions).subscribe((quizCreated) => {
      this.setSelectedTheme(theme.id);
      this.router.navigate(['./themes/' + theme.id + '/edit-quiz/' + quizCreated.id]);
    });
  }

  deleteQuiz(quiz: Quiz, theme: Theme) {
    const urlWithId = this.url + '/' + theme.id + this.quizzesPath + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setSelectedTheme(theme.id));
  }

  setSelectedQuiz(themeId: string, quizId: string) {
    const urlWithId = this.url + '/' + themeId;
    this.http.get<Theme>(urlWithId).subscribe((theme) => {
      const indexQuiz = theme.quizzes.findIndex((q) => Number(q.id) === Number(quizId));
      this.quizSelected$.next(theme.quizzes[indexQuiz]);
      console.log('Quiz sélectionné :', theme.quizzes[indexQuiz]);
    });
  }

  /*********************************************************************************************************************
   *        QUESTION                                                                                                   *
   ********************************************************************************************************************/

  addQuestion(question: Question, quiz: Quiz, themeId: string) {
    const questionUrl = this.url + '/' + themeId + this.quizzesPath + '/' + quiz.id + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(themeId, quiz.id);
      console.log('Question ajoutée :', question);
    });
  }

  deleteQuestion(question: Question, quiz: Quiz, themeId: string) {
    const questionUrl = this.url + '/' + themeId + this.quizzesPath + '/' + quiz.id + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(themeId, quiz.id));
  }
}
