import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { NbLayoutModule, NbCardModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { DetailsTaskComponent } from './details-task/details-task.component';

@NgModule({
  declarations: [TaskComponent, AddTaskComponent, ListTaskComponent, DetailsTaskComponent],
  imports: [
    TaskRoutingModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbSpinnerModule,
    Ng2SmartTableModule
  ]
})
export class TaskModule { }
