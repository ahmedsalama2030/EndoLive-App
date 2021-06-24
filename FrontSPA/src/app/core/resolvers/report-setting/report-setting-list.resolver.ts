import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportSetting } from '../../models/Entities/RepportSetting';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { ReportSettingService } from '../../services/report-setting.service';

@Injectable({
  providedIn: 'root'
})
export class ReportSettingListResolver implements Resolve<PaginationResult<ReportSetting[]> | null> {
  constructor(
    private router:Router,
    private reportSettingService:ReportSettingService,
    private toster:ToastrService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<ReportSetting[]> | null> {
      return this.reportSettingService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.toster.error('fail');
             return of(null);
         })  
     )};
        }
 