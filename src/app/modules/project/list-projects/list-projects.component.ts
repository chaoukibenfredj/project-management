import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Project } from 'src/app/models/project.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  noDataMessage = 'Pas de données !';
  source: LocalDataSource = new LocalDataSource();

  selectedProject: Project;
  loadingState = false;
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
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.initializeDataSource();
  }

  initializeDataSource() {
    this.loadingState = true;
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.source.load(data);
        this.loadingState = false;
      },
      (error) => {
        console.log(error);
        this.loadingState = false;
      }
    );

  }

  onRowSelect(data: Project) {
    if (this.selectedProject && this.selectedProject.id === data.id) {
      this.selectedProject = null;
    } else {
      this.selectedProject = data;
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
    this.router.navigate(['/app/project/details/' + this.selectedProject.id]);
  }

  navigateToFactureAdd() {
    this.router.navigate(['/app/project/add']);
  }
}
