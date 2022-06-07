import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
@Input() label: string = '';
@Input() control: FormControl = new FormControl('');
savedErrors = this.control.errors;
  

constructor() { }

showErrors() {
  const {dirty, touched, errors } = this.control;
  return dirty && touched && errors;
}

  ngOnInit(): void {
  }

}
