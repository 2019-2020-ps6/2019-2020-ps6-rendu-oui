import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Theme       } from '../../../models/theme.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  public themeForm: FormGroup;

  constructor( public formBuilder: FormBuilder, public quizService: QuizService ) {
    // Form creation
    this.themeForm = this.formBuilder.group({
      name: ['']
    });
  }

  ngOnInit() {
  }

  addTheme() {
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    this.quizService.addTheme(themeToCreate);
  }
}
