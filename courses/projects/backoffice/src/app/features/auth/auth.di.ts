import { InjectionToken, Provider } from '@angular/core';
import { AuthAdapter } from './adapters/auth.adapter';
import { AuthApplication } from './application/auth';
import { TAuthPort, TAuthUseCasesPort } from './domain';

export const AUTH_PORT = new InjectionToken<TAuthPort>('AUTH_PORT');
export const AUTH_USE_CASES_PORT = new InjectionToken<TAuthUseCasesPort>('AUTH_USE_CASES_PORT');

export const provideAuth = (): Provider[] => [
  { provide: AUTH_PORT, useClass: AuthAdapter },
  {
    provide: AUTH_USE_CASES_PORT,
    useFactory: (port: TAuthPort) => new AuthApplication(port),
    deps: [AUTH_PORT],
  },
];
