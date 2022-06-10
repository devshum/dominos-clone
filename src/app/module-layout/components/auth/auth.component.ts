import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      if(this.formIn.valid) {
        console.log(this.formIn.value);
      }
    } else {
      if(this.formUp.valid) {
        console.log(this.formUp.value);
      }
    }
  }

  public changeLoginMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  private _initFormIn(): void {
    this.formIn = this._fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  private _initFormUp(): void {
    this.formUp = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatedPassword: ['', [Validators.required]],
    })
  }

}
