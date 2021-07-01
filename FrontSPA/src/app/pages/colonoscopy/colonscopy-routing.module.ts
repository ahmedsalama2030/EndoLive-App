import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { ReportPreventUnsavedChangesGuard } from 'src/app/core/guards/report-prevent-unsaved-changes.guard';
import { ColonoscopyReportListResolver } from 'src/app/core/resolvers/colonoscopy-report/colonoscopy-report-list.resolver';
import { ColonoscopyReportOperationResolver } from 'src/app/core/resolvers/colonoscopy-report/colonoscopy-report-operation.resolver';
 import { ColonoscopyListComponent } from './colonoscopy-list/colonoscopy-list.component';
import { colonoscopOperation } from './operation/colonoscopOperation.component';

const routes: Routes = [
  {path:'',component:ColonoscopyListComponent,resolve:{data:ColonoscopyReportListResolver} , data: { animation: 'Page' }},
  {path:'operation/:id',canDeactivate:[ReportPreventUnsavedChangesGuard],component:colonoscopOperation,resolve:{data:ColonoscopyReportOperationResolver}, data: { animation: 'Page' } },
   {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColonscopyRoutingModule { }
