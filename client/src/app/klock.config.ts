import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './klock.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {graphqlProvider} from './graphql.provider';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {provideLottieOptions} from 'ngx-lottie';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideLottieOptions(
      {

        player: () => import('lottie-web')
      }
    ),
    graphqlProvider,
  ],
};
