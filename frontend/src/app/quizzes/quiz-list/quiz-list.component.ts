import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Theme } from '../../../models/theme.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public theme: Theme;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
    this.quizService.themeSelected$.subscribe((theme) => this.theme = theme);
  }

  ngOnInit() {
    this.getTheme();
  }

  getTheme(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedTheme(String(id));
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz, this.theme);
  }
}
