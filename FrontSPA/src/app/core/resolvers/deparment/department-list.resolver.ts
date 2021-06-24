 import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/Entities/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentListResolver implements Resolve<PaginationResult<Department[]> | null> {
  constructor(
    private router:Router,
    private departmentService:DepartmentService,
    private toster:ToastrService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Department[]> | null> {
      return this.departmentService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.toster.error('fail');
             return of(null);
         })  
     )};
        }
 
