import { Routes } from '@angular/router';
import { adminGuard, notLoggedInGuard } from '@guards/auth-guard/auth.guard';
import { HomeComponent } from '@pages/home/home.component';

const UserAuthComponent = () =>
  import('@pages/user-auth/user-auth.component').then(
    (m) => m.UserAuthComponent
  );
const AdminDashboardLayout = () =>
  import('@pages/admin/dashboard/dashboard.component').then(
    (m) => m.DashboardComponent
  );
const AdminDashboard = () =>
  import('@components/admin/dashboard/dashboard.component').then(
    (m) => m.DashboardComponent
  );

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'sign-up',
    title: 'Klock Ecommerce | Sign Up',
    canActivate: [notLoggedInGuard],
    loadComponent: UserAuthComponent,
    data: { isSignUp: true },
  },
  {
    path: 'sign-in',
    title: 'Klock Ecommerce | Sign In',
    canActivate: [notLoggedInGuard],
    loadComponent: UserAuthComponent,
    data: { isSignUp: false },
  },
  {
    path: 'admin-dashboard',
    title: 'Klock Ecommerce | Admin Dashboard',
    canActivate: [adminGuard],
  
    loadComponent: AdminDashboardLayout,
    children: [
      {
        path: '',
        loadComponent: AdminDashboard,
      },
    ],
  },
];
