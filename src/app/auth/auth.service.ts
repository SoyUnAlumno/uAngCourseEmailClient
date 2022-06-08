import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
  constructor(private http: HttpClient) {}
  rootUrl = 'https://api.angular-email.com'
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
    )
  }
}
