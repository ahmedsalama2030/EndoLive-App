import { ToastrModule } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
 import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
 import { PatientOperationComponent } from './patient-operation/patient-operation.component';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { ModalModule } from 'ngx-bootstrap/modal';
 import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 
 
@NgModule({
  declarations: [PatientListComponent, PatientOperationComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    TranslateModule, 
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
     
 

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PatientModule { }
