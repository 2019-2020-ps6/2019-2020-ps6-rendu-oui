import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Theme       } from '../../../models/theme.model';
import { Quiz        } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  theme: Theme;

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;

  constructor( private route: ActivatedRoute, public formBuilder: FormBuilder, private quizService: QuizService ) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
    });
    const idTheme = +this.route.snapshot.paramMap.get('id');
    this.quizService.getTheme(idTheme).subscribe((theme) => this.theme = theme);
  }

  ngOnInit() {
  }

  addQuiz() {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    // Now, add your quiz in the list!
    this.quizService.addQuiz(quizToCreate, this.theme);
  }
}
