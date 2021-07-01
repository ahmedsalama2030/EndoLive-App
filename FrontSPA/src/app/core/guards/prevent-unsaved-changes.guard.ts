import { colonoscopOperation } from './../../pages/colonoscopy/operation/colonoscopOperation.component';
import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
 import { RecordVideoComponent } from 'src/app/pages/record-video/record-video.component';
import { CanDeactivate } from '@angular/router';

     
@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<RecordVideoComponent> {
   constructor(private alertService: AlertService) { }

  async canDeactivate(component: RecordVideoComponent) {
let resultStatus=true;
     if (component.startRecord) {
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
