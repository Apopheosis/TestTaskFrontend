import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../services/auth.service";
import {Router, RouterModule} from "@angular/router";
import {AuthInterceptor} from "../../app/services/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {User} from "../../app/models/user";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalService} from "../../app/services/modal.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    RouterModule,

  ]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private modalService: ModalService) {}
  user = new User();

  navigateToSignUp() {
    this.router.navigate(['sign-up'])
  }

  login(user: User) {
    if (!this.user.username || !this.user.password) {
      this.modalService.open('modal-1')
      return
    }
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.getme();
      console.log(user)

      this.router.navigate(['mainmenu'])
    });
  }

  getme() {
    this.authService.getMe().subscribe((user: User) => {
      (<HTMLLabelElement>document.getElementById("username")).innerText = user.firstname + ' ' + user.surname + ` (${user.url})`;
    });
  }
}
