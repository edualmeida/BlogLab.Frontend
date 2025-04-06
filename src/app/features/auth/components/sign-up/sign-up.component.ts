import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterUser } from '../../../../features/auth/models/user';
import * as AuthActions from '../../store/auth.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authFeature } from '../../store/auth.reducers';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValidationErrorsComponent } from '../../../../shared/components/validation-errors/validation-errors.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './sign-up.component.scss',
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    ValidationErrorsComponent,
  ],
})
export class SignUpComponent implements OnInit {
  store = inject(Store);
  loginErrors$ = this.store.select(authFeature.selectValidationErrors);

  loginForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    middleName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    surname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  ngOnInit(): void {
    console.log(' SignUpComponent ngOnInit');
  }

  onSubmit(): void {
    this.store.dispatch(
      AuthActions.signUp({ registerUser: this.loginForm.value as RegisterUser })
    );
  }
}
