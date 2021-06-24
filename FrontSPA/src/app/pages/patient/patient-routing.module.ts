import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientOperationResolver } from 'src/app/core/resolvers/patient/patient-operation-resolver';
import { PatientListResolver } from 'src/app/core/resolvers/patient/patient-list-resolver';
  import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientOperationComponent } from './patient-operation/patient-operation.component';

const routes: Routes = [
  {path:'',component:PatientListComponent,resolve:{data:PatientListResolver}},
  {path:'operation/:id',component:PatientOperationComponent,resolve:{data:PatientOperationResolver}},
   {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
  