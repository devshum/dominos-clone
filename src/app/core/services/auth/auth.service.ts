import { StorageService } from './../local-storage/storage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { LoginResponse } from '../../interfaces/login-response';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public credentials$: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
  public user$: Subject<User | null> = new Subject<User | null>();

  private _apiKey = environment.apiKey;
  private _storageKey = 'dominos__auth';

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) { }

  public login(
    username: string, 
    password: string
  ): Observable<User> {
    return this._http.post<User>(`${this._apiKey}/auth/login`, {
      username,
      password
    }).pipe(
      map((credentials: LoginResponse | any) => {
        this.credentials$.next(credentials);
        this._storageService.setItem(this._storageKey, credentials);
        return credentials
      }),
      switchMap(({token}) => {
        if(token) {
          return this.current();
        }

        return EMPTY;
      }),
      tap((user: User) => {
        this.user$.next(user);
      }),
      catchError(({error}: HttpErrorResponse) => {
        console.log(error);

        return EMPTY
      })
    )
  }

  public autoLogin(): any {
    const credentials = this._storageService.getItem(this._storageKey);
    this.credentials$.next(credentials);

    if(!credentials) {
      return EMPTY
    }

    if(credentials) {
      return this.current().pipe(
        tap((user: User) => {
          this.user$.next(user);
        })
      );
    }
  }

  public current(): Observable<User> {
    return this._http.get<User>(`${this._apiKey}/user/current`);
  }

  public logout(): Observable<void> {
    return this._http.post<void>(`${this._apiKey}/user/logout`, {})
    .pipe(tap(() => {
      this._storageService.removeItem(this._storageKey);
      this.user$.next(null);
    }));
  }
}
