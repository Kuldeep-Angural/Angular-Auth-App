import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../routes/app.routes';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      lang: 'en',
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1087485649183-jgbjn8lhf79o35il2qp9ofi2ltsja3jf.apps.googleusercontent.com',{
            oneTapEnabled:false,prompt:'consent'
          })
        },
      ],
    } as SocialAuthServiceConfig,
  }

  ]
};
