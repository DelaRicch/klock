import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/klock.config';
import { AppComponent } from './app/klock.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
