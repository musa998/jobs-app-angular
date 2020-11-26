import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly userId = localStorage.getItem("userId");
  private readonly apiUrlBase = `http://localhost:3000/users/`;
  private readonly apiUrl = `http://localhost:3000/users/${this.userId}`;
  public userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private _router: Router, private http: HttpClient){
      this.getUserDetails()
      // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    }

  update(body) {
    return this.http.put(this.apiUrl, body);
  }
  getUserById(id) {
    console.log(id)
    return this.http.get(this.apiUrlBase+id);
  }
  deleteUser() {
    return this.http.delete(this.apiUrl);
  }
  public isOrganization(): boolean {
    return this.userValue.role === 'Organization';
}

  public get userValue(): User {
    return this.userSubject.value;
  }

  getUserDetails() {
    return this.http.get(this.apiUrl)
            .subscribe((response) => {
              this.userSubject = new BehaviorSubject<any>(response);
        }, (error) => {
              console.log(error);
      });
  }

}
