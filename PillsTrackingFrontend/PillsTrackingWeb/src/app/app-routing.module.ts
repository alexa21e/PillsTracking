import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { LandingPageComponent } from "./shared/components/landing-page/landing-page.component";

const routes: Routes = [
    {
        path: '', component: LandingPageComponent, 
    },
    {
        path: 'account',
        loadChildren: () => import('./features/account/account.module')
        .then(m => m.AccountModule),
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
        loadChildren: () => import('./features/admin/admin.module')
        .then(m => m.AdminModule),
    },
    {
        path: 'doctor',
        canActivate: [AuthGuard],
        data: { role: 'Doctor' },
        loadChildren: () => import('./features/doctor/doctor.module')
        .then(m => m.DoctorModule),
    },
    {
        path: '**', component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }