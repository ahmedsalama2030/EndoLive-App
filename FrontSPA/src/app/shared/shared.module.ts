 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import * as fromDirective from './directives';
 import * as fromPipes from './components/Pipes';
 import * as components from './components/index';
 import { RouterModule } from '@angular/router';
  import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
 import { PhotoReportComponent } from './components/photo-report/photo-report.component';
import { SpaceValidatorDirective } from './directives/validators/space-validator.directive';
import { ReportInfoComponent } from './components/report-info/report-info.component';
   
  
@NgModule({ 
  declarations: [ fromDirective.directives,fromPipes.pipes, components.components, ReportInfoComponent, PhotoReportComponent, SpaceValidatorDirective],
  imports: [    
    CommonModule, 
    RouterModule,
    PaginationModule.forRoot(),
    FormsModule,
    TranslateModule,
     
    
  ],
  exports: [fromDirective.directives,fromPipes.pipes, components.components]

})
export class SharedModule { }
 