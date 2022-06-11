import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  public formIn: FormGroup;
  public formUp: FormGroup;
  
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initFormIn();
    this._initFormUp();
  }

  public submitForm() {


    if(this.isLoginMode) {
      this.formIn.markAllAsTouched();
      if(this.formIn.valid) {
        console.log(this.formIn.value);
      }
    } else {
      this.formUp.markAllAsTouched();
      if(this.formUp.valid) {
        console.log(this.formUp.value);
      }
    }
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
