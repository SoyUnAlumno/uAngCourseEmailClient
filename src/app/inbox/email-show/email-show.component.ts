import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '../email.service';
import { Email } from 'src/app/interfaces/Email';
@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email!: Email;
  constructor(private route: ActivatedRoute,
    private emailService: EmailService) {}

  ngOnInit(): void {
   this.route.params.pipe(
     // Uses switchMap to cancel previous requests
     // avoiding showing previous requests that arrive late
     // when the newest request should be shown (previously happened
     // when nesting subscribes)
     switchMap(({ id }) => {
      return this.emailService.getEmail(id);
     })
   ).subscribe((email) =>{
     this.email = email;
   })
  }
}
