import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.autoLogin().pipe(
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
