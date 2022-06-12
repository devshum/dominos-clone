import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  public currentUser$: Observable<User | null>;
  public isLoginMode = true;
  public formIn: FormGroup;
  public formUp: FormGroup;
  private _unsubscribe: Subject<any> = new Subject<any>();
  
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._initFormIn();
    this._initFormUp();

    this.currentUser$ = this._authService.user$;
  }

  public submitForm() {


    if(this.isLoginMode) {
      this.formIn.markAllAsTouched();
      if(this.formIn.valid) {
        this._authService.login(
          this.formIn.value.login, 
          this.formIn.value.passwordIn
        ).pipe(
          takeUntil(this._unsubscribe)
        ).subscribe();
      }
    } else {
      this.formUp.markAllAsTouched();
      if(this.formUp.valid) {
        console.log(this.formUp.value);
      }
    }
  }

  public logout() {
    console.log('logout');
    this._authService.logout().pipe(
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  public changeLoginMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public hasError(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched); 
  }
  
  get login(): AbstractControl {
    return this.formIn.get('login') as AbstractControl;
  }

  get passwordIn(): AbstractControl {
    return this.formIn.get('passwordIn') as AbstractControl;
  } 

  get email(): AbstractControl {
    return this.formUp.get('email') as AbstractControl;
  }

  get passwordUp(): AbstractControl {
    return this.formUp.get('passwordUp') as AbstractControl;
  }

  get repeatedPassword(): AbstractControl {
    return this.formUp.get('repeatedPassword') as AbstractControl;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  private _initFormIn(): void {
    this.formIn = this._fb.group({
      login: [null, [Validators.required]],
      passwordIn: [null, [Validators.required]],
    })
  }

  private _initFormUp(): void {
    this.formUp = this._fb.group({
      email: ['', [
        Validators.required, 
        Validators.email
      ] ],
      passwordUp: ['', [
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)]
      ],
      repeatedPassword: ['', [Validators.required]],
    }, {
      validators: CustomValidators.passwordMatchValidator
    } as AbstractControlOptions)
  }

}
