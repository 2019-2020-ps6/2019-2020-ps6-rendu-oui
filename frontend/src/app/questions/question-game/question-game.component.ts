import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { timer } from 'rxjs';

import { Theme       } from '../../../models/theme.model';
import { Quiz        } from '../../../models/quiz.model';
import {Answer, Question} from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

import {VariablesGlobales} from '../variablesGlobales';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.scss']
})
export class QuestionGameComponent implements OnInit {

  private theme: Theme;
  private quiz: Quiz;
  private question: Question;

  private answerIsCorrect: boolean;

  constructor( private route: ActivatedRoute, private quizService: QuizService, private param: VariablesGlobales, private router: Router) {
    this.param.myVar = setTimeout(function toHome() {
      location.replace('./themes');
    }, 30000 );
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    /**
     * Method uncorrect : there is not any subscribe on the question
     * => the page needs to be refresh each time that we answer by clicking
     */
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getTheme(idTheme).subscribe((theme) => {
      this.theme = theme;
      const indexQuiz = this.theme.quizzes.findIndex((q) => Number(q.id) === idQuiz);
      this.quiz = this.theme.quizzes[indexQuiz];
      const indexQuestion = this.quiz.questions.findIndex((q) => Number(q.id) === id);
      this.question = this.quiz.questions[indexQuestion];
    });
  }

  checkAnswer(answer: Answer, isLast: boolean): void {
    this.answerIsCorrect = answer.isCorrect;
    if (!this.answerIsCorrect) {
      // tslint:disable-next-line:max-line-length
      timer(500).subscribe(() => {
        // tslint:disable-next-line:max-line-length
        this.quiz.questions[this.quiz.questions.indexOf(this.question)].answers.splice(this.quiz.questions[this.quiz.questions.indexOf(this.question)].answers.indexOf(answer), 1);
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['./theme-list/' + this.theme.id + '/play-quiz/' + this.quiz.id + '/question-game/' + this.question.id]); });
    } else {
      if (!isLast) {
        this.wait(2000);
        // tslint:disable-next-line:max-line-length
        this.router.navigate(['./theme-list/' + this.theme.id + '/play-quiz/' + this.quiz.id + '/question-game/' + this.quiz.questions[this.quiz.questions.indexOf(this.question) + 1].id]);
      } else {
        timer(2000).subscribe(() => this.router.navigate(['./theme-list']));
      }
    }
  }

  wait(duree: number): void {
      timer(duree).subscribe(x => location.reload());
  }


  clearTimeout(): void {
      clearTimeout(this.param.myVar);
  }
}
