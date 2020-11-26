import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user';
import {take} from 'rxjs/operators';
import {AccountService} from '@app/core/services/account.service';
import { Router } from '@angular/router';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  @Output() saveUserData = new EventEmitter<User>();

  formGroup: FormGroup;
  submitted = false;
  loading = false;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router,) {
  }

  ngOnInit() {
    this.user = this.accountService.userValue;
    this.createForm();
    console.log(this.user);
  }

  createForm() {
      this.formGroup = this.formBuilder.group({
        firstName  : ['', Validators.required],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

  userDataFields() {
    return this.formGroup.controls;
  }

  get firstName(){ 
    const firstName = this.formGroup.controls['firstName'];
    return firstName.value;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.update({...this.formGroup.value, email: this.accountService.userValue.email}).pipe(
      take(1)
    ).subscribe(() => {
      this.loading = false;
     
    }, () => {
      this.loading = false;
    });
  }
  deleteUser () {
    this.accountService.deleteUser().subscribe((response) => {
      this.router.navigate(['/register']);
      localStorage.clear();
    }, (error) => {
      console.log(error);
    });

  }

}
