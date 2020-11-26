import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/core/services/account.service';
import {JobsService} from '../job.service';
import {Job} from '../job.interface';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent implements OnInit {


  jobs: Job[];

  constructor(private jobsService: JobsService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getCompanyJobsContent();
  }
  
  private getCompanyJobsContent(): void {
    this.jobsService.getJobs().subscribe((response) => {
      this.jobs = response.filter(j => j.companyId === this.accountService.userValue.id);
    }, (error) => {
      console.log(error);
    });
  }

}
