import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Theme            } from '../../../models/theme.model';
import { Quiz             } from '../../../models/quiz.model';
import { Question, Answer } from '../../../models/question.model';
import { QuizService      } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {

  private theme: Theme;
  private quiz: Quiz;
  private questions: Question[];


  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) {

  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');

    this.quizService.getTheme(idTheme).subscribe((theme) => {
      this.theme = theme;

      const indexQuiz = this.theme.quizzes.findIndex((q) => Number(q.id) === idQuiz);
      this.quiz = this.theme.quizzes[indexQuiz];

      this.questions = this.quiz.questions;
      this.questions.forEach((question) => { question.answers = [];
                                             });
      this.quizService.getQuestions(idTheme, idQuiz).subscribe((questions) => this.questions = questions);

    });
  }



}
