import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxMaskModule} from "ngx-mask";
import {AuthService} from "../../authModule/services/auth.service";
import {User} from "../models/user";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgxMaskModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
  ]
})
export class ProfileComponent {
  constructor(private authService: AuthService) {
  }
  user = new User()
  ngOnInit() {
    this.refreshData()
  }

  refreshData() {
    this.authService.getMe().subscribe((user: User) => {
      this.user = user;
      (<HTMLInputElement>document.getElementById("email"))!.value = user.email;
      (<HTMLInputElement>document.getElementById("firstname")).value = user.firstname;
      (<HTMLInputElement>document.getElementById("lastname")).value = user.surname;
      (<HTMLInputElement>document.getElementById("phone_number")).value  = user.phoneNumber;
      (<HTMLInputElement>document.getElementById("url")).value  = user.url;
    })
  }

  refreshProfile(user: User) {
    this.authService.updateUser(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token)
      this.refreshData();
    });
    (<HTMLLabelElement>document.getElementById("profileReloadStatus"))!.innerText = 'Profile refresh is successful!';
    setTimeout(() => {
      (<HTMLLabelElement>document.getElementById("profileReloadStatus"))!.innerText = '';
    }, 30000)
  }

}
