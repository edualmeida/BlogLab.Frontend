import { Route } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const authPrefix = 'auth';
const authPrefixWithSlash = '/' + authPrefix + '/';
export const authRoutePaths = {
  prefix: authPrefix,
  login: (relative = false) => `${relative ? '' : authPrefixWithSlash}login`,
  signUp: (relative = false) => `${relative ? '' : authPrefixWithSlash}sign-up`,
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
