import { StorageService } from './../local-storage/storage.service';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { LoginResponse } from '../../interfaces/login-response';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public credentials$: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
  public user$: Subject<User | null> = new Subject<User | null>();

  private _apiKey = environment.apiKey;
  private _storageKey = environment.storageKey;
  private _unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

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

        return credentials;
      }),
      switchMap(({token}) => {
        if(token) {
          return this._current();
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

    console.log('autologin');
    
    if(credentials) {    
      return this._current().pipe(
        tap((user: User) => {
          this.user$.next(user);
        })
      );
    } else {
      return EMPTY
    }
  }
     
  public logout(): Observable<void> {
    return this._http.post<void>(`${this._apiKey}/user/logout`, {})
    .pipe(tap(() => {  
      this._storageService.removeItem(this._storageKey);
      this.user$.next(null);
    }));
    
  }

  private _current(): Observable<User> {
    return this._http.get<User>(`${this._apiKey}/user/current`);
  }
}
