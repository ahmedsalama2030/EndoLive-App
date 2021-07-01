import { DepartmentService } from './../../services/department.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
  import { DoctorService } from '../../services/doctor.service';
import { AlertService } from '../../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorOperationResolver implements Resolve<any> {
  constructor(
    private router:Router,
    private doctorService:DoctorService,
    private departmentService:DepartmentService,
    private toster:AlertService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
       var id=route.paramMap.get('id');
       if(id=='create'|| null){
        return this.departmentService.getall().pipe(map(result => {
          return {
            department: result,
            };},)
            ,
            catchError(err=> 
              {
               this.toster.error()
                this.router.navigate(['/patients']);
                return of(null);} ))
       }
       else{
        return forkJoin([
          this.doctorService.getById(id),
          this.departmentService.getall(),
          ]).pipe(
             map(result => {
               return {
                 doctor: result[0],
                 department: result[1]
                };},
               catchError(err=> 
                 {
                  this.toster.error()
                   this.router.navigate(['/doctors']);
                   return of(null);}
                 )
               ));  
       }

        
       
       };
        }
