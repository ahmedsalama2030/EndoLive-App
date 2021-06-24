import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColonscopyRoutingModule } from './colonscopy-routing.module';
import { OperationComponent } from './operation/operation.component';
import { ColonoscopyListComponent } from './colonoscopy-list/colonoscopy-list.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [OperationComponent, ColonoscopyListComponent],
  imports: [
    CommonModule,
    ColonscopyRoutingModule,
    SharedModule, 
    NgxEditorModule ,
    FormsModule ,
    ReactiveFormsModule,

    ]
})
export class ColonscopyModule { }
