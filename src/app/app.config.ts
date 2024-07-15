import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

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
    importProvidersFrom(HttpClientModule)
    
  ]
};
