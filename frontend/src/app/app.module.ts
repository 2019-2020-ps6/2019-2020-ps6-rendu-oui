import { NgModule            } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule    } from '@angular/common/http';

import { AppRoutingModule    } from './app.routing.module';

import { AppComponent          } from './app.component';
import { HeaderComponent       } from './header/header.component';

import { ThemeComponent        } from './themes/theme/theme.component';
import { ThemesComponent    } from './themes/themes/themes.component';
import { ThemeFormComponent    } from './themes/theme-form/theme-form.component';

import { QuizComponent         } from './quiz/quiz/quiz.component';
import { QuizzesComponent     } from './quiz/quizzes/quizzes.component';
import { QuizFormComponent     } from './quiz/quiz-form/quiz-form.component';
import { EditQuizComponent     } from './quiz/edit-quiz/edit-quiz.component';

import { QuestionComponent     } from './questions/question/question.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionGameComponent } from './questions/question-game/question-game.component';

import { UserComponent         } from './users/user/user.component';
import { UserListComponent     } from './users/user-list/user-list.component';
import { UserFormComponent     } from './users/user-form/user-form.component';
import { EditUserComponent     } from './users/edit-user/edit-user.component';

import { VariablesGlobales } from './questions/variablesGlobales';

@NgModule({
  declarations: [ // Déclaration des composants
    AppComponent,
    HeaderComponent,

    ThemeComponent,
    ThemesComponent,
    ThemeFormComponent,

    QuizComponent,
    QuizzesComponent,
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
