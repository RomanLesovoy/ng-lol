import { Component } from '@angular/core';
import { AuthenticationService } from './services';
import { User } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthenticationService]
})
export class AppComponent {

  user: Observable<User>;
  title = 'bot-manager';

  constructor() { }
}
