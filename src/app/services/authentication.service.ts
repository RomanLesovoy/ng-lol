import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { localStorageUser, CURRENT_USER } from '../helpers';
import { environment } from '../../environments/environment';
import { User } from '../models';

const TOKEN_TYPE: string = 'access_token';
const ROUTES = {
  AUTHENTICATE: 'users/user',
  LOGIN: 'users/login',
  SIGNUP: 'users',
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: Subject<User> = new Subject();
  public token: string;

  constructor(private http: HttpClient, private router: Router) {
    //this.currentUserSubject = new Subject<User>();
    //debugger;
    this.token = '';
    //this.currentUserSubject.next(localStorageUser());
    if (localStorageUser() && localStorageUser().access_token) {
      this.token = localStorageUser().access_token;
      //this.getCurrentUser().subscribe(); // TODO get user by access_token
    }
  }

  getCurrentCurrentUserSubject(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  authorization = (token): string => `${TOKEN_TYPE} ${token}`;

  setLocalUser = (user: User) => {
    if (user && user.access_token) {
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      console.log('2');
      this.currentUserSubject.next(user);
      this.router.navigate(['/']);
    } else {
      localStorage.removeItem(CURRENT_USER);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  getCurrentUser() {
    return this.http.get<any>(`${environment.apiUrl}/${ROUTES.AUTHENTICATE}`, {
      headers: {
        Authorization: this.authorization(this.token), // TODO USE INTERCEPTORS
      }
    })
      .pipe(
        map((user): any => {
          this.setLocalUser(user);
          return user;
        }),
        catchError(err => {
          this.setLocalUser(null);
          return of(null);
        })
      );
  }

  signup(userPayload: User) {
    return this.http.post<any>(`${environment.apiUrl}/${ROUTES.SIGNUP}`, userPayload)
      .pipe(
        map((user): User => {
          this.setLocalUser(user);
          return user;
        }),
        catchError(err => {
          // TODO signup error
          return of(null);
        })
      );
  }

  login(userPayload: User) {
    return this.http.post<any>(`${environment.apiUrl}/${ROUTES.LOGIN}`, userPayload)
      .pipe(
        map((user): User => {
          this.setLocalUser(user);
          return user;
        })
      );
  }

  logout() {
    this.setLocalUser(null);
  }
}
