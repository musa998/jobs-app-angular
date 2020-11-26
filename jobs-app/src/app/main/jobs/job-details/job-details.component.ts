import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Job } from '../job.interface';
import { User } from '@app/core/models/user';
import { AccountService } from '@app/core/services/account.service';
import { JobsService } from '../job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job: Job;

  @Output() jobSelected = new EventEmitter<Job>();
  @Output() jobDeleted = new EventEmitter<number>();
  userId: string;
  public jobApplicants = Array<User>();
  public appliedForJob = Array<string>();

  constructor(
     private route: ActivatedRoute,
     private jobsService: JobsService,
     private router: Router,
     private accountService: AccountService) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.jobsService.getJob(id).subscribe((response) => {
      console.log(response);
      this.job = response;
    }, (error) => {
      console.log(error);
    });

    if(this.accountService.userValue){
      this.userId = this.accountService.userValue.id;
    }
  }

  deleteJob(id){
    this.jobsService.deleteJob(id).subscribe((response) => {
      this.router.navigate(['/jobs']);
    }, (error) => {
      console.log(error);
    });
  }

  applyForJob(): void {
    if(this.accountService.userValue){
      this.job.applicants.push({...this.accountService.userValue, isAccepted: false});
    }
    console.log(this.job);

    this.jobsService.applyForJob(this.job).subscribe(() => {
       this.appliedForJob.push(this.userId);
    }, (error) => {
      console.log(error);
    });
  }

  hasApplied() {
   return this.appliedForJob.includes(this.userId)
  }

  get isOrganization(): boolean {
    if(this.accountService.userValue){
      return this.accountService.isOrganization();
    }
    return false;
  }

}
