import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import {AccountService} from '@app/core/services/account.service';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthenticationService, private accountService: AccountService) { }

  ngOnInit(): void {}

  onLogOut() {
    this.authService.logout();
  }

  get isOrganization(): boolean {
    if (this.accountService.userValue) {
      return this.accountService.isOrganization();
    }
    return false;
  }

}
