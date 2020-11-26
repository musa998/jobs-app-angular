import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent { 
  public errorMsg = '';
  form: FormGroup;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(private _service:AuthenticationService, private _router: Router, private helper: JwtHelperService, private fb: FormBuilder){}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
}

  login() {
    this._service
    .login(this.form.value)
    .subscribe((data) => {
      const token = data['accessToken'];
      localStorage.setItem("access_token", token);
      const decodedToken = this.helper.decodeToken(token);
      localStorage.setItem("user", JSON.stringify(decodedToken));

      localStorage.setItem("userId", decodedToken.sub);
      this._router.navigate(['/jobs']);
    },
    error=>{
     console.log(error);
    });
  }
}