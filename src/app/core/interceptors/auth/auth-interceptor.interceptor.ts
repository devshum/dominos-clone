import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { concatMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/login-response';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authService.credentials$.pipe(
      take(1),
      concatMap((credentials: LoginResponse | null) => {
        if(credentials?.token) {
           request = request.clone({
            setHeaders: {
              authorization: `Bearer ${credentials.token}`,
            }
          })
        }
        return next.handle(request);      
      })
    )
  }
}
