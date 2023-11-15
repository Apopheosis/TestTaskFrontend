import { Component } from '@angular/core';
import { User } from './models/user';
import { AuthService } from '../authModule/services/auth.service';
import {ModalService} from "./services/modal.service";
import {trigger, state, style, animate, transition} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [

  ]
})
export class AppComponent {
  title = 'NgDotNetAuth.UI';
  constructor(protected modalService: ModalService) {
  }



}
