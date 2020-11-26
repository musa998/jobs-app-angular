import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public errorMsg = '';
  public passwordMismatchMsg: string = "";
  formGroup: FormGroup;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  roles= ["User", "Organization"];
  role= "";
  submitted = false;

  constructor(private _service:AuthenticationService, private _router: Router, private helper: JwtHelperService, private toast: ToastrService, private fb: FormBuilder){}

  ngOnInit() {
    this.buildForm();
}

buildForm(): void {
  this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      role: ['', [Validators.required]],
  });
}
  register(){
    this._service
      .register(this.formGroup.value)
      .subscribe((data) => {
      this.submitted = true;

        const token = data['accessToken'];
      localStorage.setItem("access_token", token);
      const decodedToken = this.helper.decodeToken(token);

      localStorage.setItem("userId", decodedToken.sub);
      // this.toast.success('Successful registretion');
        this._router.navigate(['/jobs']);
      },
      error=>{
       console.log(error);
      });
    }
  }
