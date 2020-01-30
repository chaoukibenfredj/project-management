import { ValidatorFn, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

export function customEmailValidator(): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
        const customEmailRegEx = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const test = customEmailRegEx.test(control.value);
        return test ? of(null) : of({'customEmail': {value: control.value}});
    };

}
