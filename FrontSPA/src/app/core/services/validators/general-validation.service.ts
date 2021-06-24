import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralValidationService {

  constructor() { }

  textEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
       if (control.value.trim() != '') {
        return null;
      } else {
        return { textempty: true };
      }
    }
  }
}

