import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from './features/services/auth.service';
import { provideNativeDateAdapter } from '@angular/material/core';


const maskConfig: Partial<IConfig> = {
  validation: false,
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(maskConfig),
    importProvidersFrom(HttpClientModule,AuthService),
    provideNativeDateAdapter(),
  ]
};
