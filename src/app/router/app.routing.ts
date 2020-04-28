import { NgModule } from '@angular/core';﻿
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NotAuthGuard } from '../helpers';
import { HomeComponent } from '../ui/pages/home/home.component';
import { LoginComponent } from '../ui/pages/login/login.component';
import { SignupComponent } from '../ui/pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard]  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
  }
}
