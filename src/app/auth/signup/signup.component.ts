import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username: FormControl = new FormControl('');

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    // Returns if Form is invalid
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({ // Subscriber object
      // Handle success
      // Uses arrow function to bind context to Signup component. Otherwise context is the subscriber object
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      // Handle error
      error:(err)=> {
        if(!err.status) {
          this.authForm.setErrors({
            noConnection:true
          })
        } else {
          this.authForm.setErrors({
            unknownError: true
          })
        }  
        
      },
    });
  }
}
