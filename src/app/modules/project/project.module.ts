import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { NbLayoutModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { DetailsProjectComponent } from './details-project/details-project.component';

@NgModule({
  declarations: [ProjectComponent, ListProjectsComponent, DetailsProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule

  ]
})
export class ProjectModule { }
