import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailSummary{
id: string,
subject: string,
from: string,
}
interface Email {
  id:string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string,
}

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
