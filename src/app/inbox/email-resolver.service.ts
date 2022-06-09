import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot, Router
} from '@angular/router';
import { Email } from '../interfaces/Email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError((err) => {
        this.router.navigateByUrl('/inbox/not-found');
        // Return observable only because catchError requires it
        return EMPTY;
      })
    );
  }
}
