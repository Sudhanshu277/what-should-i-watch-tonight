import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withComponentInputBinding } from '@angular/router';

import { provideHttpClient,withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,  withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
      })),provideHttpClient(withFetch()) , provideClientHydration(withEventReplay())]
};
