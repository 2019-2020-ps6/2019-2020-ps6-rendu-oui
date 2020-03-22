import { NgModule            } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule    } from '@angular/common/http';
import { AppRoutingModule    } from './app.routing.module';

import { AppComponent          } from './app.component';
import { HeaderComponent       } from './header/header.component';

import { QuizComponent         } from './quizzes/quiz/quiz.component';
import { QuizListComponent     } from './quizzes/quiz-list/quiz-list.component';
import { QuizFormComponent     } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent     } from './quizzes/edit-quiz/edit-quiz.component';

import { QuestionComponent     } from './questions/question/question.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';

import { UserComponent         } from './users/user/user.component';
import { UserListComponent     } from './users/user-list/user-list.component';
import { UserFormComponent     } from './users/user-form/user-form.component';
import { EditUserComponent     } from './users/edit-user/edit-user.component';
import { CreateQuizComponent   } from './quizzes/create-quiz/create-quiz.component';

@NgModule({
  declarations: [ // Déclaration des composants
    AppComponent,
    HeaderComponent,

    QuizComponent,
    QuizListComponent,
    QuizFormComponent,
    EditQuizComponent,
    CreateQuizComponent,

    QuestionComponent,
    QuestionListComponent,
    QuestionFormComponent,

    UserComponent,
    UserListComponent,
    UserFormComponent,
    EditUserComponent
  ],
  imports: [ // Importation des modules
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Composant 'root' de l'application
})
export class AppModule { }
