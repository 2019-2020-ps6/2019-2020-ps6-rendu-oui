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
  private questionTmp: Question;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private param: VariablesGlobales, private router: Router) {
    this.param.myVar = setTimeout(function toHome() {
      location.replace('./themes');
    }, 300000 ); // 5 min
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');

    this.quizService.getTheme(Number(idTheme)).subscribe((theme) => {
      this.theme = theme;

      const indexQuiz = this.theme.quizzes.findIndex((q) => Number(q.id) === idQuiz);
      this.quiz = this.theme.quizzes[indexQuiz];

      const indexQuestion = this.quiz.questions.findIndex((q) => Number(q.id) === id);
      this.question = this.quiz.questions[indexQuestion];
      /*
      this.quizService.getQuestionsResults(String(idTheme), String(idQuiz)).subscribe((questions) => {
        console.log('questions : ', questions);
        if (questions === undefined || questions.findIndex((q) => q.id === this.question.id) == null) {
          this.questionTmp = this.question;
          this.questionTmp.answers = [];
          this.quizService.addQuestionGame(String(idTheme), String(idQuiz), this.questionTmp);
          console.log('Uncreated');
        } else {
          const index = questions.findIndex((q) => q.id === this.question.id);
          console.log('index = ', index);
          this.questionTmp = questions[index];
          console.log('Already created');
        }
      }); */
      this.quizService.getQuestionResults(String(idTheme), String(idQuiz), String(id)).subscribe((q) => {
        console.log('q :', q);
        if (q === undefined) { // this.question n'a encore jamais été répondue
          this.questionTmp = this.question;
          this.questionTmp.answers = [];
          this.quizService.addQuestionGame(String(idTheme), String(idQuiz), this.questionTmp);
          console.log('Uncreated');
        } else {
          this.questionTmp = q;
          console.log('Already created');
        }
      });
      console.log('Question tmp : ', this.questionTmp);
    });
  }

  checkAnswer(answer: Answer, isLast: boolean): void {
    this.answerIsCorrect = answer.isCorrect; // Useful to display 'BRAVO !'

    // this.questionTmp.answers[this.questionTmp.answers.length] = answer;
    this.quizService.addAnswerAnswered(this.theme.id, this.quiz.id, this.questionTmp.id, answer);

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
        console.log('cc');
        timer(2000).subscribe(() => location.reload());

        const indexNextQuestion = this.quiz.questions.findIndex((q) => q.id === this.question.id) + 1;
        console.log('index next :', indexNextQuestion);
        console.log('questions quiz :', this.quiz.questions);
        const idNextQuestion = this.quiz.questions[indexNextQuestion].id;
        console.log('id next :', idNextQuestion);
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
