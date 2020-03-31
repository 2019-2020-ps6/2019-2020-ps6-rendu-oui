import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { timer } from 'rxjs';

import { Theme       } from '../../../models/theme.model';
import { Quiz        } from '../../../models/quiz.model';
import { Question    } from '../../../models/question.model';
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

  constructor( private route: ActivatedRoute, private quizService: QuizService, private param: VariablesGlobales ) {
    this.param.myVar = setTimeout(function toHome() {
      location.replace('./quiz-list');
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

  checkAnswer(isCorrect: boolean): void {
    this.answerIsCorrect = isCorrect;
  }

  wait(): void {
      timer(2000).subscribe(x => location.reload());
  }

  clearTimeout(): void {
      clearTimeout(this.param.myVar);
  }
}
