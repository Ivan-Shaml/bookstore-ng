import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {appInterceptor} from './app.interceptor';
import {errorInterceptor} from './error.interceptor';
import {AppMandatoryServiceInitializer} from './app-mandatory-service.initializer';

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptors([appInterceptor, errorInterceptor])),
    AppMandatoryServiceInitializer,
    provideRouter(routes),
  ]
};
