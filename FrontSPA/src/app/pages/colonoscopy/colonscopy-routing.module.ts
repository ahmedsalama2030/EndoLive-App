import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { components } from 'src/app/shared/components';
import { ColonoscopyListComponent } from './colonoscopy-list/colonoscopy-list.component';
import { OperationComponent } from './operation/operation.component';

const routes: Routes = [
  {path:'',component:ColonoscopyListComponent },
  {path:'operation',component:OperationComponent },
   {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColonscopyRoutingModule { }
