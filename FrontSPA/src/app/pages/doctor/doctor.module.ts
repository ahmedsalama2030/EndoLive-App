import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
 import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DoctorOperationComponent } from './doctor-operation/doctor-operation.component';
import { NgxEditorModule } from 'ngx-editor';
 

@NgModule({
  declarations: [DoctorListComponent, DoctorOperationComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    TranslateModule,  
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxEditorModule
  ] 
})
export class DoctorModule { }
