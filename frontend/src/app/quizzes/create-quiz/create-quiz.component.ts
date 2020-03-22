import { Component, OnInit, Input} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  @Input()
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id).subscribe((quiz) => {this.quiz = quiz; });
  }
}
