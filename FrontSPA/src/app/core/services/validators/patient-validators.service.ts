  import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { PatientService } from '../patient.service';
 
@Injectable({
  providedIn: 'root'
})
export class PatientValidatorsService   {
   
constructor(private patientService:PatientService ) { }
   
    LabCodeFound():AsyncValidatorFn{
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return  this.patientService.IsLabCodeFound(control.value).pipe(
            map(isTaken => (isTaken ? { 'isLabCodefound': true } : null)),
          catchError(() => of(null)),
         );  
          
      }
    }

    
  }
 

     
 


          
           
     
  
 
 