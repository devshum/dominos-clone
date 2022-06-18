import { environment } from 'src/environments/environment';
import { StorageService } from './../../services/local-storage/storage.service';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { HttpStatusCode } from '../../models/http-status-code';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _storageKey = environment.storageKey;

  constructor(
    private _storageService: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError(({ error }: HttpErrorResponse) => {
        if(error?.statusCode === HttpStatusCode.Unauthorized) {
          this._storageService.removeItem(this._storageKey);
        }

        return throwError(error);
      })
    );
  }
}
