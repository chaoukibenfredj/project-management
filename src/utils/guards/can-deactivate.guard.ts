import { CanComponentDeactivate } from './../../app/models/can-deactivate.model';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }

}
