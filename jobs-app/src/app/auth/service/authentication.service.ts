import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccountService } from '@app/core/services/account.service';

@Injectable()
export class AuthenticationService {

  private readonly apiUrl = 'http://localhost:3000/';
  private readonly loginUrl = this.apiUrl + 'login';
  private readonly registerBaseUrl = this.apiUrl + 'register';

  constructor(
    private _router: Router, private http: HttpClient, private helper: JwtHelperService, private accountService: AccountService){}

  register(body) {
      return this.http.post(this.registerBaseUrl, body);
    }
 
  logout() {
    localStorage.clear();
    this._router.navigate(['login']);
  }
 
  login(body){
    return this.http.post(this.loginUrl, body);
  }
 
  isLoggedIn() {
    return localStorage.getItem("userId") !== null;
  }
}