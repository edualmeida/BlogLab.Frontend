import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects } from './store/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { catalogFeature } from './store/reducers/article-catalog.reducers';
import { authInterceptor } from './services/interceptors/apikey.interceptor';
import { tokenInterceptor } from './services/interceptors/token.interceptor';
import { authFeature } from './store/reducers/auth.reducers';
import { metaReducers } from './store/reducers/auth.reducers';
import { articleFeature } from './store/reducers/article.reducers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './services/interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { notificationFeature } from './store/reducers/notification.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(catalogFeature),
    provideState(articleFeature),
    provideState(notificationFeature),
    provideState(authFeature.name, authFeature.reducer, { metaReducers }),
    provideEffects(appEffects),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, tokenInterceptor])),
    DatePipe,
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideToastr()
  ],
};
