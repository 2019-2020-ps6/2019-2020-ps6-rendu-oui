import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Quiz        } from '../../../models/quiz.model';
import { Question    } from '../../../models/question.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  private questionForm: FormGroup;

  @Input()
  public quiz: Quiz;

  private nbAnswersCorrect: number;
  private nbAnswersUncorrect: number;

  constructor( private route: ActivatedRoute, public formBuilder: FormBuilder, private quizService: QuizService ) {
    this.initializeQuestionForm();
    this.nbAnswersCorrect = 0;
    this.nbAnswersUncorrect = 0;
  }

  ngOnInit() {
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: '',
      urlImage: '',
      answers: this.formBuilder.array([])
    });
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
    this.checkAnswer();
  }

  addQuestion() {
    const idTheme = +this.route.snapshot.paramMap.get('idTheme');
    const questionToAdd = this.questionForm.getRawValue() as Question;
    console.log('questionToAdd ', questionToAdd);
    this.quizService.addQuestion(String(idTheme), this.quiz.id, questionToAdd);

    this.initializeQuestionForm(); // Remise à 'zéro' des champs de saisie
  }

  checkAnswer() {
    this.nbAnswersCorrect = 0;
    this.nbAnswersUncorrect = 0;

    this.answers.getRawValue().forEach((answer) => {
      if (answer.isCorrect) {
        this.nbAnswersCorrect++;
      } else {
        this.nbAnswersUncorrect++;
      }
    });
  }
}
