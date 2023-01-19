import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('ACCESS_TOKEN')!;

    let request = req;

    if(token){
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
     
    return next.handle(request).pipe(
      catchError(this.manejaError)
    );

  }

  manejaError(error: HttpErrorResponse){
    console.warn(error);
    if (error.status === 401) {
      this.router.navigateByUrl('/auth/login');
    }
    return throwError( error );
    
  }


}
