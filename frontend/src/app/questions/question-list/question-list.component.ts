import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Quiz        } from '../../../models/quiz.model';
import { Question    } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {

  @Input()
  public quiz: Quiz;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
  }

  deleteQuestion(question: Question) {
    const themeId = +this.route.snapshot.paramMap.get('idTheme');
    this.quizService.deleteQuestion(question, this.quiz, String(themeId));
  }
}
