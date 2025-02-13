import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthModule } from 'angular-auth-oidc-client';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      AuthModule.forRoot({
        config: {
          authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_wy4hUYYhX',
          redirectUrl: 'https://d84l1y8p4kdic.cloudfront.net',
          clientId: '6lo8cn06790h6lo1blul8qg09s',
          scope: 'email openid phone',
          responseType: 'code'
        }
      })
    )
  
  ]
};
