import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  private questionForm: FormGroup;
  @Input()
  public quiz: Quiz;

  constructor(public formBuilder: FormBuilder, public questionService: QuestionService) {
    this.initializeQuestionForm();
  }

  ngOnInit() {
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: '',
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
  }

  addQuestion() {
    const questionToAdd = this.questionForm.getRawValue() as Question;
    this.questionService.addQuestion(questionToAdd, this.quiz);
  }
}
