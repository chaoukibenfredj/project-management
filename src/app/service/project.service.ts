import { PROJECTS } from './../../utils/API_URL.const';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {

    }

    getAllProjects(): Observable<any> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Project[]>(PROJECTS, { headers: header });
    }

    getProjectById(id): Observable<Project> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Project>(PROJECTS + id, { headers: header });
    }

    updateProject(project): Observable<any> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put(PROJECTS, project, { headers: header });
    }

    deleteProject(id): Observable<any> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(PROJECTS + id, { headers: header });
    }


}
