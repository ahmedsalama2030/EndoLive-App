import { ToastrService } from 'ngx-toastr';
  import { PatientService } from './../../services/patient.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Patient } from '../../models/Entities/Patient';
import { PaginationResult } from '../../models/hepler/Pagination ';

@Injectable({
    providedIn: 'root'
})
export class PatientListResolver implements Resolve<PaginationResult<Patient[]> | null> {
 
    constructor(
        private router:Router,
        private patientService:PatientService,
        private toster:ToastrService)
         { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Patient[]> | null> {
         return this.patientService.getAll().pipe(
            catchError(error => {
                 this.router.navigate(['']);
                 this.toster.error('fail');
                return of(null);
            })  
        )};
}
