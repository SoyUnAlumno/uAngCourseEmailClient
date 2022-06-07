import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

 /* With dependency injection, when the component asks for an instance of UniqueUsername, 
 Angular will see it requires an instance of HttpClient so it creates 
 a copy of that Client. */
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator{
  constructor(private http: HttpClientModule) {}
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        throw new Error('Method not implemented.');
    }


}
