import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';


export interface UsernameAvailableRespone {
  available: boolean;
}
interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string,
  
}

interface SignupResponse {
 username: string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  signein$ = new BehaviorSubject(false);


  constructor(private http: HttpClient) {}
  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableRespone>(
      this.rootUrl + '/auth/username',
      {
        username
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      this.rootUrl + '/auth/signup',
      credentials
    ).pipe(
      // Reminder: if we have an error coming out of the request, it's going to skip the tap operator
      // which is what we want.
      tap(()=> {
        this.signein$.next(true);
      })
    )
  }
}
