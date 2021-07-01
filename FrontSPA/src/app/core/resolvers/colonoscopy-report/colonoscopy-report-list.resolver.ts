import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Colonoscopy } from '../../models/Entities/Colonoscopy';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { AlertService } from '../../services/alert.service';
import { ColonoscopyReportService } from '../../services/colonoscopy-report.service';

@Injectable({
  providedIn: 'root'
})
export class ColonoscopyReportListResolver implements Resolve<PaginationResult<Colonoscopy[]> | null> {
  constructor(
    private router:Router,
    private colonoscopyReportService:ColonoscopyReportService,
    private toster:AlertService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Colonoscopy[]> | null> {
      return this.colonoscopyReportService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.toster.error();
             return of(null);
         })  
     )};
        }
 
