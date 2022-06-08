import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UsernameAvailableRespone {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableRespone>(
      'https://api.angular-email.com/auth/username',
      {
        username
      }
    );
  }

  signup(credentials: any) {
    return this.http.post<any>(
      'https://api.angular-email.com/auth/signup',
      credentials
    )
  }
}
