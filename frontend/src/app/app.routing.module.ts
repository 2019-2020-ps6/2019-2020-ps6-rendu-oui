import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';

import { QuestionGameComponent } from './questions/question-game/question-game.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full'},
  {path: 'quiz-list', component: QuizListComponent},

  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'edit-quiz/:id', component: QuizFormComponent},
  {path: 'quiz-form', component: QuizFormComponent},
  {path: 'play-quiz/:idQuiz/question-game/:id', component: QuestionGameComponent},

  {path: 'user-list', component: UserListComponent},
  {path: 'edit-user/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
