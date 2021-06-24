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
import { DoctorService } from '../../services/doctor.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorListResolver implements Resolve<PaginationResult<Doctor[]> | null> {
  constructor(
    private router:Router,
    private doctorService:DoctorService,
    private toster:ToastrService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Doctor[]> | null> {
      return this.doctorService.get().pipe(
        
         catchError(error => {
               this.router.navigate(['/doctors']);
              this.toster.error('fail');
             return of(null);
         })  
     )};
        }
