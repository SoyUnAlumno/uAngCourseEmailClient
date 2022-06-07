import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export class MatchPassword implements Validator {
  // Abstract contrl can be either FormGroup or FormControl
  validate(formGroup: FormGroup): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return {
        passswordsDontMatch: true,
      };
    }

    // throw new Error("Method not implemented.");
  }
}
