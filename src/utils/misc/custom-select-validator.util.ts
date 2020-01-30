import { ValidatorFn, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

export function customSelectValidator(resetOption: string): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
        return control.value === resetOption ? of({'customSelect': {value: control.value}}) : of(null);
    };

}
