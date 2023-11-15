import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxMaskModule} from "ngx-mask";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../app/models/user";
import {ModalService} from "../../app/services/modal.service";

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, NgxMaskModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
  ]
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router, private modalService: ModalService) {}
  user = new User();

  register(user: User) {
    if (!user.firstname || !user.surname || !user.phoneNumber || !user.email || !user.url || !user.username || !user.password) {
      this.modalService.open('modal-1')
      return
    }

    if (user.firstname?.length === 1 || user.surname?.length === 1 || user.username.length ===1 || user.password.length === 1) {
      this.modalService.open('modal-2')
      return
    }

    this.authService.register(user).subscribe();
    this.router.navigate([''])
  }
}
