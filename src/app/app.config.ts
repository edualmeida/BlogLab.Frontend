import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appEffects, articleCatalogFeatureKey } from './store/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { catalogFeature } from './store/reducers/article-catalog.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(catalogFeature),
    provideEffects(appEffects),
    provideHttpClient(),
    DatePipe,
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
