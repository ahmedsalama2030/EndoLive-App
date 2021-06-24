import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { GeneralValidationService } from 'src/app/core/services/validators/general-validation.service';

@Directive({
  selector: '[spaceValidator]',
  providers:[
    {
      provide: NG_VALIDATORS,  
      useClass: SpaceValidatorDirective,  
      multi: true     
     }
  ]
})
export class SpaceValidatorDirective implements Validator {
   
  constructor(private generalValidationService:GeneralValidationService) {
     
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return this.generalValidationService.textEmpty()(control);    

  }
   
   
}
