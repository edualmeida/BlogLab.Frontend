import { Route } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authRoutePaths = {
  prefix: 'auth',
  login: (relative = false) => `${relative ? '' : '/auth/'}login`,
  signUp: (relative = false) => `${relative ? '' : '/auth/'}sign-up`,
};

export const authRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    children: [
      {
        path: authRoutePaths.login(true),
        component: LogInComponent,
      },
      {
        path: authRoutePaths.signUp(true),
        component: SignUpComponent,
      },
    ],
  },
];
