import {Component, OnInit} from '@angular/core';
import { User } from '../../../models';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(private authenticationService: AuthenticationService) {
    // this.authenticationService.currentUserSubject.subscribe((user) => {
    //   console.log('1', user);
    //   this.user = user;
    // });
  }

  ngOnInit(): void {
    debugger;
    this.authenticationService.getCurrentCurrentUserSubject.subscribe((user) => {
      console.log('1', user);
      this.user = user;
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
