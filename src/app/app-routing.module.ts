import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';


const routes: Routes = [
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'viewTask', component: ViewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
