import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./features/doctor/home/home.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'account', loadChildren: () => import ('./features/account/account.module')
        .then(m => m.AccountModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }