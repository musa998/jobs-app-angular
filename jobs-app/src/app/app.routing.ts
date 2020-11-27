import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobListComponent } from './main/jobs/job-list/job-list.component';
import { JobsFormComponent } from './main/jobs/jobs-form/jobs-form.component';
import { JobDetailsComponent } from './main/jobs/job-details/job-details.component';
import { CompanyJobsComponent } from './main/jobs/company-jobs/company-jobs.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';

import { 
  AuthGuardService as AuthGuard 
} from '@app/auth/service/AuthGuardService';


export const AppRoutes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'jobs',
    component: JobListComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'jobs/edit/:id',
    component: JobsFormComponent
  },
  {
    path: 'jobs/details/:id',
    component: JobDetailsComponent,
  },
  {
    path: 'jobs/create',
    component: JobsFormComponent
  },
  {
    path: 'company/posts',
    component: CompanyJobsComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
]
