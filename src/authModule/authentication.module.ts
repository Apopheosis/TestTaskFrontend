import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RouterModule} from "@angular/router";
import {routes} from "./authentication.routing";

@NgModule({
  imports: [CommonModule, LoginComponent, RegisterComponent, RouterModule.forChild(routes)],
  declarations: [],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthenticationModule {

}
