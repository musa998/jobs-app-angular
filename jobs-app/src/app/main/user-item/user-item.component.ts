import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from "@app/core/models/user";
import { AccountService } from '@app/core/services/account.service';
import {JobsService} from '@app/main/jobs/job.service';
import {Job} from '@app/main/jobs/job.interface';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  @Input() job: Job;


  userData: Partial<User> = {};

  @Output() userSelected = new EventEmitter<User>();
  @Output() userDeleted = new EventEmitter<number>();

  constructor(private accountService: AccountService, private jobsService: JobsService) {
  }

  ngOnInit(): void {
    //  this.accountService.getUserById(this.user).pipe(
    //    take(1)
    //  ).subscribe(response => {
    //    this.userData = response;
    //  })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.post && changes.post.currentValue) {
  //     console.log('ngOnChanges');
  //   }
  // }

  approveUser() { 
    this.jobsService.aproveUser(this.user.id, this.job).subscribe((response) => {
      // this.router.navigate(['/jobs']);
    }, (error) => {
      console.log(error);
    });
  }

}
