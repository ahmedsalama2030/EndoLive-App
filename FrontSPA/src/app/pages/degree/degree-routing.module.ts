import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DegreeResolver } from 'src/app/core/resolvers/degree/degree.resolver';
import { DegreeComponent } from './degree/degree.component';

const routes: Routes = [
  {path:'',component:DegreeComponent,resolve:{data:DegreeResolver}},
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DegreeRoutingModule { }
