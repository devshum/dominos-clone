import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      if (!control.value) {
        return null;
      }
  
      const valid = regex.test(control.value);
  
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl): void  {
    const password: string = control!.get('passwordUp')!.value;

    const confirmPassword: string = control!.get('repeatedPassword')!.value;
    
    if (password !== confirmPassword) {
      control!.get('repeatedPassword')!.setErrors({ NoPassswordMatch: true });
    }
  }
}
