import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ModuleWithProviders, NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: '', component: LoginComponent},
   {path: 'sign-up', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)}
]
@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class routing {}
