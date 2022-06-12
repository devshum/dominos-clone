import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../interfaces/login-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiKey = environment.apiKey;

  constructor(private _http: HttpClient) { }
  
  public credentials$: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);

  public login(
    username: string, 
    password: string
  ): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${this._apiKey}/auth/login`, {
      username,
      password
    }).pipe(
      tap(credentials => this.credentials$.next(credentials))
    )
  }

  public current(): Observable<User> {
    return this._http.get<User>(`${this._apiKey}/user/current`);
  }
}
