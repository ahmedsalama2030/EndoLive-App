import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListResolver } from 'src/app/core/resolvers/deparment/department-list.resolver';
import { DeparmentComponent } from './deparment/deparment.component';

const routes: Routes = [

  {path:'',component:DeparmentComponent,resolve:{data:DepartmentListResolver}},
     {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeparmentRoutingModule { }
