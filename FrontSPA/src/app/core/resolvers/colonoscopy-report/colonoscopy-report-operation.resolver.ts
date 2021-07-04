import { DoctorService } from './../../services/doctor.service';
import { PatientService } from './../../services/patient.service';
import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';

@Injectable({
    providedIn: 'root'
})
export class ColonoscopyReportOperationResolver implements Resolve<any[]> {
    constructor(
        private router: Router,
        private patientService: PatientService,
        private doctorService: DoctorService,
        private toster: AlertService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        let id = route.paramMap.get('id');
        if (id == null || id == '') {
            this.errorMassge('not found');
        }
        return forkJoin([
            this.doctorService.getAllDoctors(),
            this.patientService.getById(id)
        ]).pipe(
            map(result => {
                return {
                    doctors: result[0],
                    patient: result[1]
                };
            },
                catchError(err => {
                    return this.errorMassge();
                }
                )
            ));
    }


    errorMassge(mag?: string) {
        this.toster.error()
         this.router.navigateByUrl('/patients');

        return of(null);
    }


}

