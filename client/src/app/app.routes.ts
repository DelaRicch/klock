import { Routes } from '@angular/router';

const HomeComponent = () =>
  import('@pages/home/home.component').then((m) => m.HomeComponent);
const UserAuthComponent = () => import('@pages/user-auth/user-auth.component').then((m) => m.UserAuthComponent);

export const routes: Routes = [
  { path: '', loadComponent: HomeComponent },
  {path: 'sign-up', loadComponent: UserAuthComponent, data: {isSignUp: true}},
  {
    path: 'sign-in',
    loadComponent: UserAuthComponent, data: {isSignUp: false},
  },
];
