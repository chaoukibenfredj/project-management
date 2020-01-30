import { Dialog } from './../models/dialog.model';
import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';



@Injectable()
export class DialogService {

    private dialog = new Subject<Dialog>();
    private dialogResponse = new Subject<boolean>();


    constructor() {}

    displayDialog(title: string, message: string): Observable<boolean> {

        setTimeout(
            () => {
                const dialog = new Dialog();
                dialog.display = true;
                dialog.title = title;
                dialog.message = message;
                this.dialog.next(dialog);
            },
            0
        );

        this.dialogResponse = new Subject<boolean>();
        return this.dialogResponse.asObservable();

    }

    listenForDialogState(): Observable<Dialog> {

        return this.dialog.asObservable();

    }

    onProceed() {

        this.dialogResponse.next(true);
        this.dialogResponse.complete();
        const dialog = new Dialog();
        dialog.display = false;
        this.dialog.next(dialog);

    }

    onCancel() {

        this.dialogResponse.next(false);
        this.dialogResponse.complete();
        const dialog = new Dialog();
        dialog.display = false;
        this.dialog.next(dialog);

    }

}
