import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
       

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    BsDropdownModule.forRoot(),
    TranslateModule,
    SharedModule,
    LoadingBarModule
    ]
})
export class MainModule { }
