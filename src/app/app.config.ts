import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects } from './core/store/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { catalogFeature } from './features/articles/store/article-catalog.reducers';
import { apiKeyAuthInterceptor } from './core/interceptors/apikey-auth.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { authFeature } from './features/auth/store/auth.reducers';
import { metaReducers } from './features/auth/store/auth.reducers';
import { articleFeature } from './features/articles/store/article.reducers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideToastr } from 'ngx-toastr';
import { notificationFeature } from './core/store/notification.reducers';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { ArticleExistsGuard } from './features/articles/guards/article-exists.guard';
import { bookmarkFeature } from './features/bookmarks/store/bookmark.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideStore(),
    provideState(catalogFeature),
    provideState(articleFeature),
    provideState(notificationFeature),
    provideState(authFeature.name, authFeature.reducer, { metaReducers }),
    provideState(bookmarkFeature),
    provideEffects(appEffects),
    provideHttpClient(
      withInterceptors([
        apiKeyAuthInterceptor,
        tokenInterceptor,
        errorInterceptor,
        loadingInterceptor,
      ])
    ),
    DatePipe,
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ArticleExistsGuard,
  ],
};
