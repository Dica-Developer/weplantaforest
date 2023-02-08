import { UntypedFormGroup } from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(formGroup: UntypedFormGroup) {
    let password = formGroup.controls['password'].value; // to get value in input tag
    let confirmPassword = formGroup.controls['passwordConfirmation'].value; // to get value in input tag
    if (password != confirmPassword) {
      formGroup.controls['passwordConfirmation'].setErrors({
        MatchPassword: true,
      });
    } else {
      return null;
    }
  }
}
