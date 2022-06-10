import { Component, Input, OnInit } from '@angular/core';
import { Email } from 'src/app/interfaces/Email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
  showModal = false;

  @Input() email!: Email;


  constructor() {}

  ngOnInit(): void {
    const text = this.email.text.replace(/\ngi/, '\>n ');
    this.email = {
      ...this.email,
      from:this.email.to,
      to:this.email.from,
      subject: `RE:${this.email.subject}`,
      text: `\n\n\n---------${this.email.from} wrote: \n> ${text}`
    }
  }

  onSubmit(email: Email) {}
}
