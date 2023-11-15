import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import {ModalService} from "./modal.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(tap(
      (event) => {
        if (event instanceof HttpResponse) {
          console.log(event.body)

        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error == 'User not found.') {
            console.log('Unauthorized.')
            this.modalService.open('modal-3')
          }
          if (err.status == 400) {
            (<HTMLLabelElement>document.getElementById("profileReloadStatus"))!.innerText = err.error;
            setTimeout(() => {
              (<HTMLLabelElement>document.getElementById("profileReloadStatus"))!.innerText = '';
            }, 3000)
          }

        }
      }
    ));
  }
}
