import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { timer } from 'rxjs';

import { Theme            } from '../../../models/theme.model';
import { Quiz             } from '../../../models/quiz.model';
import { Question, Answer } from '../../../models/question.model';
import { QuizService      } from '../../../services/quiz.service';

import { VariablesGlobales } from '../variablesGlobales';

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

  constructor(private route: ActivatedRoute, private quizService: QuizService, private param: VariablesGlobales, private router: Router) {
    this.param.myVar = setTimeout(function toHome() {
      location.replace('./themes');
    }, 300000 );
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');

    this.quizService.getTheme(idTheme).subscribe((theme) => {
      this.theme = theme;

      const indexQuiz = this.theme.quizzes.findIndex((q) => Number(q.id) === idQuiz);
      this.quiz = this.theme.quizzes[indexQuiz];

      const indexQuestion = this.quiz.questions.findIndex((q) => Number(q.id) === id);
      this.question = this.quiz.questions[indexQuestion];
      console.log(this.question);
    });
  }

  checkAnswer(answer: Answer, isLast: boolean): void {
    this.answerIsCorrect = answer.isCorrect; // Useful to display 'BRAVO !'
    if (!this.answerIsCorrect) {
      timer(500).subscribe(() => {
        const indexQuestion = this.quiz.questions.indexOf(this.question);
        const answers = this.quiz.questions[indexQuestion].answers;
        answers.splice(answers.indexOf(answer), 1);

        const route = './themes/' + this.theme.id + '/play-quiz/' + this.quiz.id + '/question-game/' + this.question.id;
        this.router.navigate([route]);
      });
    } else {
      if (!isLast) {
        timer(2000).subscribe(() => location.reload());

        const indexNextQuestion = this.quiz.questions.indexOf(this.question) + 1;
        const idNextQuestion = this.quiz.questions[indexNextQuestion].id;
        const route = './themes/' + this.theme.id + '/play-quiz/' + this.quiz.id + '/question-game/' + idNextQuestion;
        this.router.navigate([route]);
      } else {
        timer(2000).subscribe(() => this.router.navigate(['./themes']));
      }
    }
  }

  clearTimeout(): void {
      clearTimeout(this.param.myVar);
  }
}
