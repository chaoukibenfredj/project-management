import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { ToastService } from 'src/app/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { customSelectValidator } from 'src/utils/misc/custom-select-validator.util';
import { UserService } from 'src/app/service/user.service';
import { TaskService } from 'src/app/service/task.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  noDataMessage = 'Pas de données !';

  loadingState = false;
  listDev: User[] = [];
  selectedProjectId;
  selectedProject: Project;


  addTask: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    developper: ['', Validators.required, customSelectValidator('X')],
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private projectService: ProjectService,
    private toastService: ToastService
  ) { }

  ngOnInit() {


    this.activedRoute.paramMap.subscribe(
      (data: ParamMap) => {
        this.selectedProjectId = data.get('id');
        this.projectService.getProjectById(this.selectedProjectId)
          .subscribe(data1 => {
            this.selectedProject = data1;
          }, err => {
            console.log(err);
          });

      }
    );
    this.getAllDevelopers();
  }

  getAllDevelopers() {
    this.loadingState = true;
    this.userService.getAllDevelopers().subscribe(data => {
      this.listDev = data;
      this.loadingState = false;
    }, err => {
      this.loadingState = false;
      console.log(err);
    });
  }



  onCancel() {
    this.addTask.reset();
  }

  onAddTask() {

    this.loadingState = true;
    const task = {} as Task;
    const project = {} as Project;
    const user = {} as User;
    user.id = this.addTask.get('developper').value;
    project.id = this.selectedProjectId;
    task.user = user;
    task.projet = project;
    task.name = this.addTask.get('name').value;
    console.log(task);
    this.taskService.addTask(task).subscribe(data => {
      this.toastService.showSuccessToast('Tache ajouté avec succès !', 'Succès');
      this.loadingState = false;
      this.addTask.reset();
      this.router.navigate(['/app/task/list/' + this.selectedProjectId]);
    }, err => {
      console.log(err);
      this.loadingState = false;
      this.toastService.showErrorToast('Erreur Serveur', 'Erreur');
    });
  }
}
