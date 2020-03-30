import { NgModule            } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule    } from '@angular/common/http';

import { AppRoutingModule    } from './app.routing.module';

import { AppComponent          } from './app.component';
import { HeaderComponent       } from './header/header.component';

import { ThemeComponent        } from './themes/theme/theme.component';
import { ThemeListComponent    } from './themes/theme-list/theme-list.component';
import { ThemeFormComponent    } from './themes/theme-form/theme-form.component';

import { QuizComponent         } from './quizzes/quiz/quiz.component';
import { QuizListComponent     } from './quizzes/quiz-list/quiz-list.component';
import { QuizFormComponent     } from './quizzes/quiz-form/quiz-form.component';
import { EditQuizComponent     } from './quizzes/edit-quiz/edit-quiz.component';

import { QuestionComponent     } from './questions/question/question.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionGameComponent } from './questions/question-game/question-game.component';

import { UserComponent         } from './users/user/user.component';
import { UserListComponent     } from './users/user-list/user-list.component';
import { UserFormComponent     } from './users/user-form/user-form.component';
import { EditUserComponent     } from './users/edit-user/edit-user.component';
import {VariablesGlobales} from './questions/variablesGlobales';

@NgModule({
  declarations: [ // Déclaration des composants
    AppComponent,
    HeaderComponent,

    ThemeComponent,
    ThemeListComponent,
    ThemeFormComponent,

    QuizComponent,
    QuizListComponent,
    QuizFormComponent,
    EditQuizComponent,

    QuestionComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionGameComponent,

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
  providers: [VariablesGlobales],
  bootstrap: [AppComponent] // Composant 'root' de l'application
})
export class AppModule { }
