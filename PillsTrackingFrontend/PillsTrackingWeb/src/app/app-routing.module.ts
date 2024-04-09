import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorViewComponent } from './features/doctor-view/doctor-view.component';
import { MedicationListComponent } from './features/medication-list/medication-list.component';
import { PatientListComponent } from './features/patient-list/patient-list.component';

const routes: Routes = [
    {
        path:'',
        component: DoctorViewComponent,
    },
    {
        path: 'medication-list',
        component: MedicationListComponent,
    },
    {
        path: 'patient-list',
        component: PatientListComponent,
    },
  //{
    //path: 'manager',
    //loadChildren: () =>
      //import('./features/features.module').then((m) => m.FeaturesModule),
  //},

  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
