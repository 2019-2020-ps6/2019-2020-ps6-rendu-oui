import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  private quiz: Quiz;

  constructor( private route: ActivatedRoute, private quizService: QuizService ) {
    this.getQuiz();
  }

  ngOnInit() {
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id).subscribe((quiz) => {
      this.quiz = quiz;
      console.log('Quiz lancé :', quiz);
    });
  }
}
