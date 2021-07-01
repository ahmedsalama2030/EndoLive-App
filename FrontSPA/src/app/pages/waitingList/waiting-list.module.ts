import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingListRoutingModule } from './waiting-list-routing.module';
import { WaitinglistListComponent } from './waitinglist-list/waitinglist-list.component';
 import { WaitinglistEditComponent } from './waitinglist-edit/waitinglist-edit.component';


@NgModule({
  declarations: [WaitinglistListComponent, WaitinglistEditComponent],
  imports: [
    CommonModule,
    WaitingListRoutingModule,
    SharedModule,
    TranslateModule
  ]
}) 
export class WaitingListModule { }
