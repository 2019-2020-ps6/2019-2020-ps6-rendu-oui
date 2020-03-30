import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Theme       } from '../../../models/theme.model';
import { Quiz        } from '../../../models/quiz.model';
import { Question    } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.scss']
})
export class QuestionGameComponent implements OnInit {

  theme: Theme;
  quiz: Quiz;
  question: Question;

  private answerIsCorrect: boolean;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
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
}
