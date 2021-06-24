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
import { DegreeService } from '../../services/degree.service';

@Injectable({
  providedIn: 'root'
})
export class DegreeResolver implements Resolve<PaginationResult<Degree[]> | null> {
  constructor(
    private router:Router,
    private degreeService:DegreeService,
    private toster:ToastrService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Degree[]> | null> {
      return this.degreeService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.toster.error('fail');
             return of(null);
         })  
     )};
        }
 
