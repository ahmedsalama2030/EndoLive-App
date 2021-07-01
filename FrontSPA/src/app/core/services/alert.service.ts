import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

constructor(
private toastrService:ToastrService,
private translateService:TranslateService

) { }

 
success(msg:string="success process"):void{
  this.translateService.get(msg).subscribe((res: string) => {
    this.toastrService.success(res);

});
}
 
error(msg:string="fail process"){
  this.translateService.get(msg).subscribe((res: string) => {
    this.toastrService.error(res);

});
}

info(msg:string){
  this.translateService.get(msg).subscribe((res: string) => {
    this.toastrService.error(res);

});
}
 confirm(msg:string):Observable<boolean> {
  let msgtrans=msg;
  this.translateService.get(msg).subscribe((res: string) => {
    msgtrans=res;
});
return   of(   confirm(msgtrans));
;
}

}
