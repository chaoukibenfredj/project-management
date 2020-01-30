import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: NbToastrService) { }

  showErrorToast(message, title) {
    this.toastrService.danger(message, title,
      {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 4000,
        hasIcon: true,
        destroyByClick: true,
        status: 'danger',
      }
    );
  }

  showSuccessToast(message, title) {
    this.toastrService.success(message, title,
      {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 4000,
        hasIcon: true,
        destroyByClick: true,
        status: 'success',
      }
    );
  }

  showWarningToasts(data) {
    data.forEach(element => {
      let today = moment();
      let expDate = moment(element.date_expiration);
      this.showWarningToast(`${element.lib_contrat} va être expiré dans ${expDate.diff(today, 'days')} jours !`, 'Attention !')
    });
  }

  showWarningPersonnelExpirationToasts(data) {
    data.forEach(element => {
      let today = moment();
      let expDate = moment(element.expiration_date);
      this.showWarningToast(`Le contrat de : '${element.nom} ${element.prenom}' - Matricule: '${element.mat}' , va être expiré dans ${expDate.diff(today, 'days')} jours !`, 'Attention !')
    });
  }

  showWarningToast(message, title) {
    this.toastrService.warning(message, title,
      {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 0,
        hasIcon: true,
        destroyByClick: true,
        status: 'warning',
      }
    );
  }

}
