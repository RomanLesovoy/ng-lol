import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../../services';
import { User } from '../../../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  // providers: [AuthenticationService],
})
export class SignupComponent implements OnInit {

  nameType = 'name';
  emailType = 'email';
  passwordType = 'password';
  passwordConfirmType = 'password_confirm';
  signForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
  ) { }

  buildSignupForm = (): FormGroup => {
    return this.formBuilder.group({
      [this.nameType]: [null, [Validators.required]],
      [this.emailType]: [null, [Validators.required, Validators.email]],
      [this.passwordType]: [null, [Validators.required, Validators.minLength(6)]],
      [this.passwordConfirmType]: [null, [Validators.required, Validators.minLength(6)]],
    }, { validators: [this.checkPasswords] });
  }

  checkPasswords = (group: FormGroup) => {
    if (!group.get(this.passwordType) || group.get(this.passwordConfirmType)) {
      return { notSame: true };
    }
    return group.get(this.passwordType).value === group.get(this.passwordConfirmType).value
      ? null : { notSame: true };
  }

  ngOnInit(): void {
    this.signForm = this.buildSignupForm();
  }

  onFormSubmit() {
    this.spinner.show();
    this.authenticationService.signup(this.signForm.value)
      .subscribe((user: User) => {
        this.spinner.hide();
      }, (err: any) => {
        this.spinner.hide();
      });
  }
}
