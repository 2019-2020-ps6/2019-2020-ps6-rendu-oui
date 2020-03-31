import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemesComponent } from './themes/themes/themes.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';

import { QuizzesComponent } from './quiz/quizzes/quizzes.component';
import { EditQuizComponent } from './quiz/edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quiz/quiz-form/quiz-form.component';

import { QuestionGameComponent } from './questions/question-game/question-game.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/themes', pathMatch: 'full'},
  {path: 'themes', component: ThemesComponent},
  {path: 'theme-form', component: ThemeFormComponent},

  {path: 'themes/:id/quizzes', component: QuizzesComponent},
  {path: 'themes/:id/quiz-form', component: QuizFormComponent},

  {path: 'themes/:idTheme/edit-quiz/:id', component: EditQuizComponent},

  {path: 'themes/:idTheme/play-quiz/:idQuiz/question-game/:id', component: QuestionGameComponent},

  {path: 'user-list', component: UserListComponent},
  {path: 'edit-user/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
