import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as deepEqual from "deep-equal";

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private http: HttpClient) {

    }
    isFormsEquals(updateTmpForm, updateForm): boolean {
        return deepEqual(updateTmpForm, updateForm.value);
    }

    isObjectEquals(obj1, obj2) {
        return deepEqual(obj1, obj2);
    }

    isZeroForm(form) {
        return ((Object.values(form.value).reduce((a, b) => Number(a) + Number(b), 0)) == 0);
    }


}