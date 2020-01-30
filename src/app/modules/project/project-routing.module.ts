import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { DetailsProjectComponent } from './details-project/details-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'list',
        component: ListProjectsComponent
      },
      {
        path: 'details/:id',
        component: DetailsProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
