import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator } from '@angular/forms';
import { map, catchError, of } from 'rxjs';

/* With dependency injection, when the component asks for an instance of UniqueUsername, 
 Angular will see it requires an instance of HttpClient so it creates 
 a copy of that Client. */
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate = (control: AbstractControl) => {
    const { value } = control;

    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
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
