import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColonscopyRoutingModule } from './colonscopy-routing.module';
import { colonoscopOperation } from './operation/colonoscopOperation.component';
import { ColonoscopyListComponent } from './colonoscopy-list/colonoscopy-list.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [colonoscopOperation, ColonoscopyListComponent],
  imports: [
    CommonModule,
    ColonscopyRoutingModule,
    SharedModule,
    NgxEditorModule,
    ModalModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ColonscopyModule { }
