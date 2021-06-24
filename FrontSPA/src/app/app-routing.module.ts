import { AuthModule } from './pages/auth/auth.module';
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
  loadChildren:() => import('./pages/main/main.module').then(m =>m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(a => a.AuthModule) 
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
