import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects } from './store/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { catalogFeature } from './store/reducers/article-catalog.reducers';
import { apiKeyAuthInterceptor } from './interceptors/apikey-auth.interceptor';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { authFeature } from './store/reducers/auth.reducers';
import { metaReducers } from './store/reducers/auth.reducers';
import { articleFeature } from './store/reducers/article.reducers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { notificationFeature } from './store/reducers/notification.reducers';
import {loadingInterceptor} from './interceptors/loading.interceptor';
import {ArticleExistsGuard} from './guards/article-exists.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideStore(),
    provideState(catalogFeature),
    provideState(articleFeature),
    provideState(notificationFeature),
    provideState(authFeature.name, authFeature.reducer, { metaReducers }),
    provideEffects(appEffects),
    provideHttpClient(withInterceptors([apiKeyAuthInterceptor, errorInterceptor, tokenInterceptor, loadingInterceptor])),
    DatePipe,
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideToastr(),
    ArticleExistsGuard
  ],
};
