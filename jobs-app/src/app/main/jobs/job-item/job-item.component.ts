import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Job } from '../job.interface';
import { JobsService } from '../job.service';
import { AccountService } from '@app/core/services/account.service';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit, OnChanges {

  @Input() job: Job;


  @Output() jobSelected = new EventEmitter<Job>();
  @Output() jobDeleted = new EventEmitter<number>();

  public likedJobs = Array<number>();
  public appliedForJob = Array<string>();

  constructor(private jobsService: JobsService, private accountService: AccountService)  {
    // console.log('constructor');
  }

  ngOnInit(): void {
    // console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.job && changes.job.currentValue) {
      // console.log('ngOnChanges');
    }
  }

  markAsFavorite(): void {
    this.job.likesCount += 1;
    this.jobsService.updateJob(this.job).subscribe(() => {
       this.likedJobs.push(this.job.id)
    }, (error) => {
      console.log(error);
    });
  }

  applyForJob(): void {
    if(this.accountService.userValue){
      this.job.applicants.push({...this.accountService.userValue, isAccepted: true});
    }

    this.jobsService.applyForJob(this.job).subscribe(() => {
       this.appliedForJob.push(this.accountService.userValue.id);
    }, (error) => {
      console.log(error);
    });
  }

  hasApplied() {
   return this.appliedForJob.includes(this.accountService.userValue.id)
  }
}
