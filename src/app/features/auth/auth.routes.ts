import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthEffects } from './store/auth.effects';
import { LogInComponent } from './components/log-in/log-in.component';
import { authFeature, metaReducers } from './store/auth.reducers';
import { AuthService } from './services/auth.service';

export const routes: Route[] = [
  {
    path: '',
    component: LogInComponent,
    providers: [
      AuthService,
      provideEffects(AuthEffects),
      provideState(authFeature.name, authFeature.reducer, { metaReducers }),
    ],
  },
];
