import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Quiz } from '../../../models/quiz.model';
import { Question } from '../../../models/question.model';
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
    // this.getQuiz();
    // this.getQuestion();
    this.init();
  }

  init(): void {
    /**
     * Method uncorrect : there is not any subscribe on the question
     * => the page needs to be refresh each time that we answer by clicking
     */
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Quiz id : ', idQuiz);
    this.quizService.getQuiz(idQuiz).subscribe((quiz) => {
      this.quiz = quiz;
      const index = this.quiz.questions.findIndex((q) => Number(q.id) === id);
      this.question = this.quiz.questions[index];
      console.log('Quiz lancé :', this.quiz);
      console.log('Question demandée :', this.question);
    });
  }

  getQuiz(): void {
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    console.log('Quiz id : ', idQuiz);
    this.quizService.getQuiz(idQuiz).subscribe((quiz) => {
      this.quiz = quiz;
      console.log('Quiz lancé :', this.quiz);
    });
  }

  getQuestion(): void {
    const idQuiz = +this.route.snapshot.paramMap.get('idQuiz');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('Question id : ', id);
    this.quizService.getQuestion(idQuiz, id).subscribe((question) => {
      this.question = question;
      console.log('Question demandée :', this.question);
    });
  }
}
