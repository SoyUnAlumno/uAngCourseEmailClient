import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  // Abstract contrl can be either FormGroup or FormControl. The course uses formGroup: FormGroup, but TS complains
  // so AbstractControl is used.
  validate(formGroup: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return {
        passwordsDontMatch: true,
      };
    }

    // throw new Error("Method not implemented.");
  }
}
