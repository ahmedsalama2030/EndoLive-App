import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { RecordVideoComponent } from 'src/app/pages/record-video/record-video.component';
import { colonoscopOperation } from 'src/app/pages/colonoscopy/operation/colonoscopOperation.component';

     
@Injectable({
  providedIn: 'root'
})
export class ReportPreventUnsavedChangesGuard implements CanDeactivate<colonoscopOperation> {
   constructor(private alertService: AlertService) { }

  async canDeactivate(component: colonoscopOperation) {
let resultStatus=true;
    if ( !component.formReport.valid) {
       this.alertService.confirm('this page contain data unsave sure to move').subscribe(
      (res)=>{
        if(!res)
         resultStatus= false;
         else
         resultStatus=true;
      }
    );
     } 
    return resultStatus
  }

 


}
