import {APP_INITIALIZER, FactoryProvider} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';


export function initializeAuthServiceFactory(authService: AuthService): () => Observable<void> {
  return () => authService.init();
}

export const AppMandatoryServiceInitializer: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeAuthServiceFactory,
  deps: [AuthService],
  multi: true
};
