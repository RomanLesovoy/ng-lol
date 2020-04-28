import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // providers: [AuthenticationService],
})
export class LoginComponent implements OnInit {

  emailType = 'email';
  passwordType = 'password';
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
  ) { }

  buildLoginForm = (): FormGroup => {
    return this.formBuilder.group({
      [this.emailType]: [null, [Validators.required, Validators.email]],
      [this.passwordType]: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  onFormSubmit() {
    this.spinner.show();
    this.authenticationService.login(this.loginForm.value)
      .subscribe((user: User) => {
        this.spinner.hide();
      }, (err: any) => {
        this.spinner.hide();
      });
  }
}
