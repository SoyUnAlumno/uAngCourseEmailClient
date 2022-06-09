import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UsernameAvailableRespone } from '../interfaces/UsernameAvailableResponse';
import { SignupCredentials } from '../interfaces/SignupCredentials';
import { SignupResponse } from '../interfaces/SignupResponse';
import { SignedinResponse } from '../interfaces/SignedinResponse';
import { SigninCredentials } from '../interfaces/SigninCredentials';
import { SigninResponse } from '../interfaces/SigninResponse';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject<boolean | null>(null);
  username: string = '';

  constructor(private http: HttpClient) {}
  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableRespone>(
      this.rootUrl + '/auth/username',
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        // Reminder: if we have an error coming out of the request, it's going to skip the tap operator
        // which is what we want.
        tap((response) => {
          this.signedin$.next(true);
          this.username = response.username; 
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(this.rootUrl + '/auth/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
      .pipe(
        tap((response) => {
        this.signedin$.next(true);
        this.username = response.username;
      }));
  }
}
