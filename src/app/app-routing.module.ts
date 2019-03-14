import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent } from './UI/user/add-user/add-user.component';
import { AddProjectComponent } from './UI/project/add-project/add-project.component';
import { AddTaskComponent } from './UI/task/add-task/add-task.component';
import { ViewTaskComponent } from './UI/task/view-task/view-task.component';
import { EditTaskComponent } from './UI/task/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'viewTask', component: ViewTaskComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
