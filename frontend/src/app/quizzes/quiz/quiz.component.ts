import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  ngOnInit() {
    console.log('Quiz :', this.quiz);
  }

  deleteQuiz() {
    this.quizDeleted.emit(this.quiz);
  }
}
