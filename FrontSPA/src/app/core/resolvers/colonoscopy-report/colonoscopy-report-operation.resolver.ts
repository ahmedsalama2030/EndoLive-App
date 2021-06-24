// import { DoctorService } from './../../services/doctor.service';
// import { Doctor } from 'src/app/core/models/Entities/Doctor';
// import { Injectable } from '@angular/core';
// import {
//   Router, Resolve,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { PatientService } from '../../services/patient.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class ColonoscopyReportOperationResolver  implements Resolve<any> {
//   constructor(
//     private router:Router,
//     private patientService: PatientService,
//     private departmentService:DoctorService,
//      private toster:ToastrService) { }
//  resolve(route: ActivatedRouteSnapshot):Observable<any> {
//      let id=route.paramMap.get('id')  ;
//       if(id=='create' || id==null)
//     {
//        return forkJoin([
//           this.departmentService.getall(),
//           this.degreeService.getall()
//          ]).pipe(
//              map(result => {
//                return {
//                  deparment: result[0],
//                   degree: result[1]
//                 };},
//                catchError(err=> 
//                  {
//                   this.toster.error('fail')
//                    this.router.navigate(['/patients']);
//                    return of(null);}
//                  )
//                ));  
//     }
//     else{
//      return forkJoin([
//      this.patientService.getById(id),
//      this.departmentService.getall(),
//       this.degreeService.getall()
//      ]).pipe(
//          map(result => {
//            return {
//                patient: result[0],
//                department: result[1],
//                degree: result[2]
//            };},
//            catchError(err=> 
//              {
//               this.toster.error('fail')
//                this.router.navigate(['/patients']);
//                return of(null);}
//              )              ));
//          }
//  }
// }
