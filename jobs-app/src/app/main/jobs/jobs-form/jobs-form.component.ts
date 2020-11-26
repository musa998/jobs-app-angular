import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../job.interface';
import { JobsService } from '../job.service';
import { take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from '@app/core/services/account.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.scss']
})
export class JobsFormComponent implements OnInit, OnDestroy {

  @Output() jobSubmitted = new EventEmitter<Job>();

  job: Job;
  submitted = false;
  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private jobsService: JobsService) {
    this.job = {
      title: '',
      content: '',
      publishDate: '',
      companyName: '',
      category: '',
      location: '',
      salary: 0,
      likesCount: 0,
      applicants: [],
    };
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if (id) {
        this.getJob(id);
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;

    const job: Job = {
      ...this.formGroup.value,
      publishDate: this.job.publishDate || new Date(),
      likesCount: this.job.likesCount || 0,
      companyId: this.accountService.userValue.id,
      applicants: this.job.applicants || [],
    };

    if (!job.id) {
      // create
      this.jobsService.createJob({...job}).pipe(
        take(1)
      ).subscribe(() => {
        // redirect
        this.router.navigate(['/jobs']);
      }, (error) => {
        console.log(error);
      });

      return;
    }

    this.jobsService.updateJob(job).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['/jobs']);
    }, (error) => {
      console.log(error);
    });
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      id: this.job.id,
      title: [this.job.title, [Validators.required, Validators.minLength(5)]],
      content: [this.job.content, [Validators.required]],
      companyName: [this.job.companyName, [Validators.required]],
    });
  }

  get isOrganization(): boolean {
    if (this.accountService.userValue) {
      return this.accountService.isOrganization();
    }
    return false;
  }

  private getJob(id: number): void {
    this.jobsService.getJob(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.job = response;

      this.buildForm();
    });
  }

}
