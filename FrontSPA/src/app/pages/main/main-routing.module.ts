import { MainComponent } from './main.component';
import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordVideoComponent } from '../record-video/record-video.component';
import { PreventUnsavedChangesGuard } from 'src/app/core/guards/prevent-unsaved-changes.guard';


const routes: Routes = [

  {
    path: '', component: MainComponent, children: [


      {
        path: '', redirectTo: 'home'
      },
      {
        path: 'home', component: HomeComponent, data: { animation: 'Page' }

      },

      {
        path: 'record',canDeactivate:[PreventUnsavedChangesGuard], component: RecordVideoComponent, data: { animation: 'Page' }
      } 
      ,
      {
        path: 'departments',
        loadChildren: () => import('../department/deparment.module').then(a => a.DeparmentModule) 
      }
      ,
      {
        path: 'patients',
        loadChildren: () => import('../patient/patient.module').then(a => a.PatientModule) 
      }
      ,
      {
        path: 'doctors',
        loadChildren: () => import('../doctor/doctor.module').then(a => a.DoctorModule) 
      }
      ,
      {
        path: 'degrees',
        loadChildren: () => import('../degree/degree.module').then(a => a.DegreeModule) 
      }
      ,
      {
        path: 'waiting-list',
        loadChildren: () => import('../waitingList/waiting-list.module').then(a => a.WaitingListModule) 
      },
      {
        path: 'colonoscopy',
        loadChildren: () => import('../colonoscopy/colonscopy.module').then(a => a.ColonscopyModule) 
      }
      
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
