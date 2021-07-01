import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Degree } from '../../models/Entities/Degree';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { AlertService } from '../../services/alert.service';
import { DegreeService } from '../../services/degree.service';

@Injectable({
  providedIn: 'root'
})
export class DegreeResolver implements Resolve<PaginationResult<Degree[]> | null> {
  constructor(
    private router:Router,
    private degreeService:DegreeService,
    private alertService: AlertService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Degree[]> | null> {
      return this.degreeService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.alertService.error('');
             return of(null);
         })  
     )};
        }
 
