import { GET_ALL_DEVELOPERS } from './../../utils/API_URL.const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    getAllDevelopers(): Observable<any> {
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<User[]>(GET_ALL_DEVELOPERS, { headers: header });
    }

}
