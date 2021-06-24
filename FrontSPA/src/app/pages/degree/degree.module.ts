import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DegreeRoutingModule } from './degree-routing.module';
import { DegreeComponent } from './degree/degree.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DegreeComponent],
  imports: [
    CommonModule,
    DegreeRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    TranslateModule,  
     FormsModule,
  ]
})
export class DegreeModule { }
