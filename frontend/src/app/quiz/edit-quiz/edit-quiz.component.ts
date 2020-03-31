import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Quiz        } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(): void {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(String(idTheme), String(id));
  }
}
