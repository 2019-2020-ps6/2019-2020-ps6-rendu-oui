import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full'},
  {path: 'quiz-list', component: QuizListComponent},

  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'quiz-form', component: QuizFormComponent},
  {path: 'play-quiz/:id', component: PlayQuizComponent},

  {path: 'user-list', component: UserListComponent},
  {path: 'edit-user/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
