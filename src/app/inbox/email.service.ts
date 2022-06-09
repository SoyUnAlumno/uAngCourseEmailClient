import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../interfaces/Email';
import { EmailSummary } from '../interfaces/EmailSummary';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
rootUrl: string = 'https://api.angular-email.com';


  constructor(private http: HttpClient) { }

getEmails() {
 return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`
  // No need for credentials because we previousl set that up with the interceptor
  )
}

getEmail(id: string) {
return this.http.get<Email>(`${this.rootUrl}/emails/${id}`);
}

}
