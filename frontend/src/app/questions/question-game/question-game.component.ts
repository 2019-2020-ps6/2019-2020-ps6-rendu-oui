import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.scss']
})
export class QuestionGameComponent implements OnInit {

  @Input()
  question: Question;

  constructor() {
  }

  ngOnInit() {
  }

  selectAnswer(value: string): void {
    console.log('Réponse sélectionnée :', value);
  }
}
