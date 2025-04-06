import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: [
    '../../../../shared/styles/index.scss',
    './log-in.component.scss',
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    ValidationErrorsComponent,
  ],
})
export class LogInComponent implements OnInit {
  store = inject(Store);
  loginErrors$ = this.store.select(authFeature.selectValidationErrors);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit(): void {
    console.log(' LogInComponent ngOnInit');
  }

  onSubmit(): void {
    this.store.dispatch(
      AuthActions.logIn({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
    );
  }
}
