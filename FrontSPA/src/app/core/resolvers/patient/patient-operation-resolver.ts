import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DegreeService } from "../../services/degree.service";
import { DepartmentService } from "../../services/department.service";
import { PatientService } from "../../services/patient.service";
 @Injectable({
    providedIn: 'root'
})
export class PatientOperationResolver implements Resolve<any> {
     constructor(
       private router:Router,
       private patientService: PatientService,
       private departmentService:DepartmentService,
       private degreeService:DegreeService,
       private toster:ToastrService) { }
    resolve(route: ActivatedRouteSnapshot):Observable<any> {
        let id=route.paramMap.get('id')  ;
         if(id=='create' || id==null)
       {
          return forkJoin([
             this.departmentService.getall(),
             this.degreeService.getall()
            ]).pipe(
                map(result => {
                  return {
                    deparment: result[0],
                     degree: result[1]
                   };},
                  catchError(err=> 
                    {
                     this.toster.error('fail')
                      this.router.navigate(['/patients']);
                      return of(null);}
                    )
                  ));  
       }
       else{
        return forkJoin([
        this.patientService.getById(id),
        this.departmentService.getall(),
         this.degreeService.getall()
        ]).pipe(
            map(result => {
              return {
                  patient: result[0],
                  department: result[1],
                  degree: result[2]
              };},
              catchError(err=> 
                {
                 this.toster.error('fail')
                  this.router.navigate(['/patients']);
                  return of(null);}
                )              ));
            }
    }
}
