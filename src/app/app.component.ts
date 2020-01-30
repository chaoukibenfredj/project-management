import { Dialog } from './models/dialog.model';
import { DialogService } from './service/dialog.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App';

  dialog: Dialog = new Dialog();
  dialogStateSubscription: Subscription;

  constructor(
    private dialogService: DialogService) { }

  ngOnInit() {

    this.dialogStateSubscription = this.dialogService.listenForDialogState().subscribe(
      (dialog) => this.dialog = dialog
    );

  }

  onProceed() {

    this.dialogService.onProceed();

  }

  onCancel() {

    this.dialogService.onCancel();

  }

  ngOnDestroy() {

    if (this.dialogStateSubscription) {
      this.dialogStateSubscription.unsubscribe();
    }

  }
}
