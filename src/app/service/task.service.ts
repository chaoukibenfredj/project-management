import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_TASKS_BY_PROJECT_ID, TASKS } from 'src/utils/API_URL.const';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) {

    }

    getTasksByProjectId(id): Observable<Task[]> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Task[]>(GET_TASKS_BY_PROJECT_ID + id, { headers: header });
    }

    addTask(task: Task) {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post<Task[]>(TASKS, task, { headers: header });
    }

    getTaskById(id): Observable<Task> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Task>(TASKS + id, { headers: header });
    }

    updateTask(task): Observable<Task> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put<Task>(TASKS, task, { headers: header });
    }

    deleteTask(id): Observable<any> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete(TASKS + id, { headers: header });
    }

}
