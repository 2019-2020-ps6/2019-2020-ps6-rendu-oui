import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { ThemeFormComponent } from './themes/theme-form/theme-form.component';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';

import { QuestionGameComponent } from './questions/question-game/question-game.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/themes', pathMatch: 'full'},
  {path: 'themes', component: ThemeListComponent},
  {path: 'theme-form', component: ThemeFormComponent},

  {path: 'themes/:id/quizzes', component: QuizListComponent},
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
