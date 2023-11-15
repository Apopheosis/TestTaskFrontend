import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../authModule/services/auth.service";
import {User} from "../models/user";
import {AppRoutingModule} from "../app.routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }
  user = new User()
  ngOnInit() {
    this.authService.getMe().subscribe((user: User) => {
      (<HTMLLabelElement>document.getElementById("username")).innerText = user.firstname + ' ' + user.surname + ` (${user.url})`;
    });

  }

  logout() {
    this.authService.logout();
    (<HTMLLabelElement>document.getElementById("username")).innerText = '';
    this.router.navigate(['']);

  }
}
