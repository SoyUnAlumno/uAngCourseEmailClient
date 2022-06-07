import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

/* With dependency injection, when the component asks for an instance of UniqueUsername, 
 Angular will see it requires an instance of HttpClient so it creates 
 a copy of that Client. */
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: AbstractControl) => {
    const { value } = control;

    return this.authService.usernameAvailable(value)
      .pipe(
        map(() => {
          // Returns no matter what, because it will only get up to this point if
          // the observable doesn't emit an error object (an error object would skip some operators
          // thus it would skip map()
          return null;
        }),
        catchError((err) => {
          console.log(err);
          if (err.error.username) {
            // Uses shortcut 'of({})' to create new Observable
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
