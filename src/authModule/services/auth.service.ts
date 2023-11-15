import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../app/models/user';
import {Subject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("authToken")

    return token!==null && !this.jwtHelper.isTokenExpired(token)
  }


  public register(user: User): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7272/api/Auth/register',
      user
    );
  }

  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7272/api/Auth/login', user, {
      responseType: 'text',
    });
  }

  public getMe(): Observable<any> {
    return this.http.get('https://localhost:7272/api/Auth');
  }

  public logout(): void {
    localStorage.removeItem("authToken")
  }

  public refreshToken(): Observable<any> {
    return this.http.post('https://localhost:7272/api/Auth/refresh-token', {
      responseType: 'text'
    });
  }

  public updateUser(user: User): Observable<string> {
    return this.http.post('https://localhost:7272/api/Auth/update-user', user, {
      responseType: 'text'
    })
  }
}
