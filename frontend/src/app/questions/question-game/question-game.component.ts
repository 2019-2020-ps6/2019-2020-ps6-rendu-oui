import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Quiz        } from '../../../models/quiz.model';
import { Question    } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.scss']
})
export class QuestionGameComponent implements OnInit {

  quiz: Quiz;
  question: Question;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
  }

  ngOnInit() {
    this.getQuiz();
    // this.getQuestion();
    // this.init();
  }

  init(): void {
    /**
     * Method uncorrect : there is not any subscribe on the question
     * => the page needs to be refresh each time that we answer by clicking
     */
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(idTheme, idQuiz).subscribe((quiz) => {
      this.quiz = quiz;
      console.log('Quiz lancé :', this.quiz);
      const index = this.quiz.questions.findIndex((q) => Number(q.id) === id);
      this.question = this.quiz.questions[index];
      console.log('Question demandée :', this.question);
    });
  }

  getQuiz(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    console.log('Quiz id : ', idQuiz);
    this.quizService.getQuiz(idTheme, idQuiz).subscribe((quiz) => {
      this.quiz = quiz;
      console.log('Quiz lancé :', this.quiz);
      this.getQuestion();
    });
  }

  getQuestion(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Question id : ', id);
    this.quizService.getQuestion(idTheme, idQuiz, id).subscribe((question) => {
      this.question = question;
      console.log('Question demandée :', this.question);
    });
  }
}
