import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListResolver } from 'src/app/core/resolvers/doctor/doctor-list.resolver';
import { DoctorOperationResolver } from 'src/app/core/resolvers/doctor/doctor-operation.resolver';
 import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorOperationComponent } from './doctor-operation/doctor-operation.component';
const routes: Routes = [
  {path:'',component:DoctorListComponent,resolve:{data:DoctorListResolver}, data: { animation: 'Page' }},
  {path:'operation/:id',component:DoctorOperationComponent,resolve:{data:DoctorOperationResolver}, data: { animation: 'Page' }},
    {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
