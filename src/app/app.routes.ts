import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {LoginComponent} from "../authModule/login/login.component";
import {AppComponent} from "./app.component";
import {BillingComponent} from "./billing/billing.component";
import {ReportsComponent} from "./reports/reports.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "../authModule/register/register.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {AuthenticationModule} from "../authModule/authentication.module";

export const routes: Routes = [
  {path: '', loadChildren: () => import('../authModule/authentication.module').then(({AuthenticationModule}) => AuthenticationModule)},
  {path: 'mainmenu', loadComponent: () => import('./main-menu/main-menu.component').then(m => m.MainMenuComponent), canActivate: [AuthGuard]},
  {path: 'profile', loadComponent: () => import('./profile/profile.component').then(({ProfileComponent}) => ProfileComponent), canActivate: [AuthGuard]},
  {path: 'home', loadComponent: () => import('./home/home.component').then(({HomeComponent}) => HomeComponent), canActivate: [AuthGuard]},
  {path: 'inventory', loadComponent: () => import('./inventory/inventory.component').then(({InventoryComponent}) => InventoryComponent), canActivate: [AuthGuard]},
  {path: 'reports', loadComponent: () => import('./reports/reports.component').then(({ReportsComponent}) => ReportsComponent), canActivate: [AuthGuard]},
  {path: 'billing', loadComponent: () => import('./billing/billing.component').then(({BillingComponent}) => BillingComponent), canActivate: [AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
