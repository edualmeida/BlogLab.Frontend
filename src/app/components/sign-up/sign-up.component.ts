import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterUser } from '../../models/user';
import * as AuthActions from '../../store/actions/auth.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authFeature } from '../../store/reducers/auth.reducers';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../styles/index.scss', './sign-up.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, RouterModule],
})
export class SignUpComponent {
  store = inject(Store);
  errorMessage$ = this.store.select(authFeature.selectError);

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

  onSubmit(): void {
    this.store.dispatch(
      AuthActions.signUp({ registerUser: this.loginForm.value as RegisterUser })
    );
  }
}
