import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Doctor } from '../../models/Entities/Doctor';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { AlertService } from '../../services/alert.service';
import { DoctorService } from '../../services/doctor.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorListResolver implements Resolve<PaginationResult<Doctor[]> | null> {
  constructor(
    private router:Router,
    private doctorService:DoctorService,
    private alertService: AlertService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Doctor[]> | null> {
      return this.doctorService.get().pipe(
        
         catchError(error => {
               this.router.navigate(['/doctors']);
              this.alertService.error();
             return of(null);
         })  
     )};
        }
