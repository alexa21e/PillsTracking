import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { LoginComponent } from "./features/account/login/login.component";

const routes: Routes = [
    {
        path: '', component: LoginComponent, 
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