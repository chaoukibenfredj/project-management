import { TaskComponent } from './task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTaskComponent } from './list-task/list-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { DetailsTaskComponent } from './details-task/details-task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      {
        path: 'list/:id',
        component: ListTaskComponent
      },
      {
        path: 'details/:id',
        component: DetailsTaskComponent
      },
      {
        path: 'add/:id',
        component: AddTaskComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
