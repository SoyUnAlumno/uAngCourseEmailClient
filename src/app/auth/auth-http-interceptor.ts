import { Injectable } from "@angular/core";
import { HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,
    HttpEventType
 } from "@angular/common/http";
import { filter, Observable, tap } from "rxjs";

/* Within HttpInterceptor we do not use this syntax for dependency injection 
@Injectable({
    providedIn: 'root'
}) */
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Req properties are read only so uses clone to make modifications
        const modifiedReq = req.clone({
            withCredentials: true
        });
        
        return next.handle(modifiedReq).
        pipe(
            filter(val => val.type == HttpEventType.Sent),
            tap(val=> {
                console.log('Sent the request');
            })
        );
    }



}
