import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Job} from '../job.interface';

@Component({
  selector: 'app-job-list-view',
  templateUrl: './job-list-view.component.html',
  styleUrls: ['./job-list-view.component.scss']
})
export class JobListViewComponent {

  @Input() jobs: Job[];

  @Output() jobDeleted = new EventEmitter<number>();

  selectedJob: Job;

  constructor() {
  }

  onJobSelected(job: Job): void {
    this.selectedJob = job;
  }
}
