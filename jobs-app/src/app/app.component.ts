import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(){
    let users = JSON.parse(localStorage.getItem("USERS"))
    if(users == null){
      users = [];
      users.push({
        email:'admin@admin.com',
        password: 'admin',
        userName:'ADMIN'
      });
      // localStorage.setItem("USERS", JSON.stringify(users))
    }
  }
}