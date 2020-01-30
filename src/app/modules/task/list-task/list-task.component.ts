import { Project } from 'src/app/models/project.model';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  noDataMessage = 'Pas de données !';
  source: LocalDataSource = new LocalDataSource();

  selectedTask: Task;
  selectedProjectId;
  loadingState = false;
  selectedProject: Project;
  filterFormGroup: FormGroup = this.formBuilder.group({
    search: [''],
  });
  settings = {
    columns: {
      id: {
        title: 'Id',
        filter: false
      },
      name: {
        title: 'Nom',
        filter: false
      },
      user: {
        title: 'Developpeur',
        filter: false
      }
    },
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    noDataMessage: this.noDataMessage
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(
      (data: ParamMap) => {
        this.selectedProjectId = data.get('id');
        this.initializeDataSource();
      }
    );
    this.initializeDataSource();
  }

  initializeDataSource() {
    this.loadingState = true;

    this.projectService.getProjectById(this.selectedProjectId)
      .subscribe(data => {
        this.selectedProject = data;
      }, err => {
        console.log(err);
      });

    this.taskService.getTasksByProjectId(this.selectedProjectId).subscribe(
      (data: Task[]) => {
        data.forEach((element: any) => {
          element.user = element.user.firstname + ' ' + element.user.lastname;
        });
        this.source.load(data);
        console.log(data);
        this.loadingState = false;
      },
      (error) => {
        console.log(error);
        this.loadingState = false;
      }
    );
  }

  onRowSelect(data: Task) {
    if (this.selectedTask && this.selectedTask.id === data.id) {
      this.selectedTask = null;
    } else {
      this.selectedTask = data;
    }
  }

  onSearch() {
    const keyWord = this.filterFormGroup.get('search').value;
    if (keyWord.length > 0) {
      this.source.setFilter(
        [
          {
            field: 'id',
            search: keyWord
          },
          {
            field: 'user',
            search: keyWord
          },
          {
            field: 'name',
            search: keyWord
          }
        ],
        false
      );
    } else {
      this.source.reset();
    }
  }

  navigateToLigneDetails() {
    this.router.navigate(['/app/task/details/' + this.selectedTask.id]);
  }

  navigateToTaskAdd() {
    this.router.navigate(['/app/task/add/' + this.selectedProjectId]);
  }

}
