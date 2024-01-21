import { Routes } from '@angular/router';

const SignInComponent = () =>
  import('@pages/sign-in/sign-in.component').then((m) => m.SignInComponent);

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: SignInComponent,
  },
];
