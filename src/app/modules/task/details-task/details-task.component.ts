import { ToastService } from './../../../service/toast.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { UtilsService } from 'src/app/service/utils.service';
import { TaskService } from 'src/app/service/task.service';
import * as deepEqual from 'deep-equal';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import { customSelectValidator } from 'src/utils/misc/custom-select-validator.util';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.scss']
})
export class DetailsTaskComponent implements OnInit {

  taskId: string;
  selectedTask: Task;
  defaultMessage = 'Pas de données !';
  deleteLoadingState = false;
  isUpdate = false;
  updateTmpForm = {};
  updateForm: FormGroup;
  loadingState = false;
  listDev: User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    public utilsService: UtilsService,
    private router: Router,
    private userService: UserService,
    private taskService: TaskService,
    private toastService: ToastService,
  ) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.taskId = paramMap.get('id');
        this.initializeTaskDetails();
        this.getAllDevelopers();
      }
    );
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

  initializeTaskDetails() {
    this.loadingState = true;
    this.taskService.getTaskById(this.taskId)
      .subscribe(data => {
        console.log(data);
        this.selectedTask = data;
        this.loadingState = false;
      }, err => {
        this.loadingState = false;
        console.log(err);
      });
  }

  isFormsEquals(): boolean {
    console.log(deepEqual(this.updateTmpForm, this.updateForm.value));
    console.log('====================================');
    console.log(this.updateTmpForm, this.updateForm.value);
    console.log('====================================');
    return deepEqual(this.updateTmpForm, this.updateForm.value);
  }

  onUpdate() {
    this.updateForm = this.formBuilder.group({
      name: [this.selectedTask.name, Validators.required],
      developper: [this.selectedTask.user.id, Validators.required, customSelectValidator('X')],
    });
    this.updateTmpForm = this.updateForm.value;
    this.isUpdate = true;
  }
  saveUpdate() {
    this.loadingState = true;
    const obj = {
      id: this.selectedTask.id,
      name: this.updateForm.get('name').value,
      projet: { id: this.selectedTask.projet.id },
      user: { id: this.updateForm.get('developper').value }
    };
    console.log(obj);
    this.taskService.updateTask(obj)
      .subscribe(data => {
        console.log(data);
        this.toastService.showSuccessToast('La tâche est à jour maintenant !', 'Succès !');
        this.initializeTaskDetails();
        this.loadingState = false;
        this.isUpdate = false;
      }, err => {
        console.log(err);
        this.loadingState = false;
        this.isUpdate = false;
        this.toastService.showErrorToast('Problème serveur !', 'Erreur !');
      });

  }
  onCancel() {
    if (!deepEqual(this.updateTmpForm, this.updateForm.value)) {
      this.dialogService.displayDialog(
        'Confirmer',
        'Voulez-vous annuler les modifications de la tâche ?'
      ).subscribe(
        (dialogResponse) => {
          if (dialogResponse) {
            this.updateForm.reset();
            this.isUpdate = false;
          }
        }
      );
    } else {
      this.isUpdate = false;
      this.updateForm.reset();
    }
  }

  deleteProject() {
    this.dialogService.displayDialog(
      'Confirmer',
      'Voulez-vous supprimer le projet ?'
    ).subscribe(
      (dialogResponse) => {
        if (dialogResponse) {
          this.loadingState = true;
          this.taskService.deleteTask(this.selectedTask.id)
            .subscribe(data => {
              console.log(data);
              this.router.navigate(['/app/task/list/' + this.selectedTask.projet.id]);
            }, err => {
              console.log(err);
              this.loadingState = false;
            });
        }
      }
    );
  }

  navigateToListTasks() {
    this.router.navigate(['/app/task/list/' + this.selectedTask.id]);
  }


}
