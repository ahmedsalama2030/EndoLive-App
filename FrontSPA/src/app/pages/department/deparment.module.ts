import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeparmentRoutingModule } from './deparment-routing.module';
import { DeparmentComponent } from './deparment/deparment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DeparmentComponent],
  imports: [
    CommonModule,
    DeparmentRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    TranslateModule,  
     FormsModule,

  ]   
})
export class DeparmentModule { }
