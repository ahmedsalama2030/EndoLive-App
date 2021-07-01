import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitinglistEditComponent } from './waitinglist-edit/waitinglist-edit.component';
 import { WaitinglistListComponent } from './waitinglist-list/waitinglist-list.component';

const routes: Routes = [
  {path:'',component:WaitinglistListComponent, data: { animation: 'Page' }},
  {path:'edit',component:WaitinglistEditComponent, data: { animation: 'Page' }},
  {path:'**',redirectTo:''}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingListRoutingModule { }
