import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from "../authModule/login/login.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {IConfig, NgxMaskDirective, NgxMaskModule, NgxMaskPipe} from "ngx-mask";
import {RouterModule} from "@angular/router";
import {ModalComponent} from "./modal/modal.component";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthenticationModule} from "../authModule/authentication.module";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";


export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null

export function tokenGetter() {
  return localStorage.getItem("token")
}
@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, HeaderComponent, AuthenticationModule, MainMenuComponent,
  NgxMaskModule.forRoot(),
    RouterModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7272"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimations()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
