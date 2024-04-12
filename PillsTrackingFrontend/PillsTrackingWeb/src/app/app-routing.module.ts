import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
    {   
        path: 'account', 
        loadChildren: () => import ('./features/account/account.module')
        .then(m => m.AccountModule)},
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/admin/admin.module')
        .then(m => m.AdminModule),
    },
    {
        path: 'secretary',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/doctor/doctor.module')
        .then(m => m.DoctorModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }