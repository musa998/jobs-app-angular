import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthenticationService } from './auth/service/authentication.service';
import { AuthGuardService } from './auth/service/AuthGuardService';

// import { MDBBootstrapModule } from 'angular-bootstrap-md'; 

import { JwtModule } from "@auth0/angular-jwt";
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { JobItemComponent } from './main/jobs/job-item/job-item.component';
import { JobListViewComponent } from './main/jobs//job-list-view/job-list-view.component';
import { JobListComponent } from './main/jobs//job-list/job-list.component';
import { JobsFormComponent } from './main/jobs/jobs-form/jobs-form.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import { JobDetailsComponent } from './main/jobs/job-details/job-details.component';
import { CompanyJobsComponent } from './main/jobs/company-jobs/company-jobs.component';
import { UserItemComponent } from './main/user-item/user-item.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    JobItemComponent,
    JobListViewComponent,
    JobListComponent,
    JobsFormComponent,
    UserProfileComponent,
    JobDetailsComponent,
    CompanyJobsComponent,
    UserItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot(),
    // MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"],
      },
    }),
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
