import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Question } from '../../../models/question.model';
import {Quiz} from '../../../models/quiz.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  private questions: Question[];

  @Input()
  public quiz: Quiz;

  constructor(public questionService: QuestionService) {
    this.questionService.questions$.subscribe((questions) => this.questions = questions);
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question, this.quiz);
  }
}
