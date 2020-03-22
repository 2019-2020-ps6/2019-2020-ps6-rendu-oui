import {Component, Input } from '@angular/core';

import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  @Input()
  public quiz: Quiz;

  constructor(public quizService: QuizService) {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(question, this.quiz);
  }
}
