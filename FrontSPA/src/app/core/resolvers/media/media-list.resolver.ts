import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Media } from '../../models/Entities/Media';
import { PaginationResult } from '../../models/hepler/Pagination ';
import { DepartmentService } from '../../services/department.service';
import { MediaService } from '../../services/media.service';

@Injectable({
  providedIn: 'root'
})
export class MediaListResolver implements Resolve<PaginationResult<Media[]> | null> {
  constructor(
    private router:Router,
    private MediaService:MediaService,
    private toster:ToastrService)
     { }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PaginationResult<Media[]> | null> {
      return this.MediaService.get().pipe(
         catchError(error => {
              this.router.navigate(['']);
              this.toster.error('fail');
             return of(null);
         })  
     )};
        }
 
