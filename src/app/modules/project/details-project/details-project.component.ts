import { Project } from './../../../models/project.model';
import { Component, OnInit } from '@angular/core';
import * as deepEqual from 'deep-equal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { UtilsService } from 'src/app/service/utils.service';
import { ToastService } from 'src/app/service/toast.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss']
})
export class DetailsProjectComponent implements OnInit {

  personnelId: string;
  selectedProject: Project;
  defaultMessage = 'Pas de données !';
  deleteLoadingState = false;

  isUpdate = false;

  updateTmpForm = {};

  updateForm: FormGroup;

  loadingState = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    public utilsService: UtilsService,
    private router: Router,
    private projectService: ProjectService,
    private toastService: ToastService,
  ) { }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.personnelId = paramMap.get('id');
        this.initializeProjectDetails();
      }
    );
  }
  initializeProjectDetails() {
    this.loadingState = true;
    this.projectService.getProjectById(this.personnelId)
      .subscribe(data => {
        console.log(data);

        this.selectedProject = data;
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
      name: [this.selectedProject.name, Validators.required],
    });
    this.updateTmpForm = this.updateForm.value;
    this.isUpdate = true;
  }
  saveUpdate() {
    this.loadingState = true;
    const obj = { id: this.selectedProject.id, name: this.updateForm.get('name').value };
    this.projectService.updateProject(obj)
      .subscribe(data => {
        console.log(data);
        this.toastService.showSuccessToast('Le projet est à jour maintenant !', 'Succès !');
        this.initializeProjectDetails();
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
        'Voulez-vous annuler les modifications de projet ?'
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
          this.projectService.deleteProject(this.selectedProject.id)
            .subscribe(data => {
              console.log(data);
              this.router.navigate(['/app/project/list']);
            }, err => {
              console.log(err);
              this.loadingState = false;
            });
        }
      }
    );
  }

  navigateToListTasks() {
    this.router.navigate(['/app/task/list/' + this.selectedProject.id]);
  }

}
