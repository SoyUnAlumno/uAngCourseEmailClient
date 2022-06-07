import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

 /* With dependency injection, when the component asks for an instance of UniqueUsername, 
 Angular will see it requires an instance of HttpClient so it creates 
 a copy of that Client. */
@Injectable({ providedIn: 'root' })
export class UniqueUsername {
  constructor(private http: HttpClientModule) {}


}
