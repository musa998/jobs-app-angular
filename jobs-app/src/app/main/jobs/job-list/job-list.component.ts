import { Component, OnInit } from '@angular/core';
import {Job} from '../job.interface';
import {JobsService} from '../job.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { AccountService } from '@app/core/services/account.service';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs: Job[];

  destroy$ = new Subject<boolean>();

  constructor(private jobsService: JobsService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getContent();
  }

  onJobDelete(jobId: number): void {
    this.jobsService.deleteJob(jobId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => {
      this.getContent();
    }, (error) => {
      console.log(error);
    });
  }

  private getContent(): void {
    this.jobsService.getJobs().subscribe((response) => {
      this.jobs = response;
    }, (error) => {
      console.log(error);
    });
  }

  get isOrganization(): boolean {
    console.log(this.accountService.userValue);
    if(this.accountService.userValue){
      return this.accountService.isOrganization();
    }
    return false;
  }
}
