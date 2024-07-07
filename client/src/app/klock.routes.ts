import { Routes } from '@angular/router';
import { adminGuard, notLoggedInGuard } from '@guards/auth.guard';
import { HomeComponent } from '@pages/home/home.component';

const UserAuthComponent = () =>
  import('@pages/user-auth/user-auth.component').then(
    (m) => m.UserAuthComponent
  );
const AdminDashboardLayout = () =>
  import('@pages/admin/dashboard-layout/dashboard-layout.component').then(
    (m) => m.DashboardComponent
  );
const AdminDashboard = () =>
  import('@pages/admin/dashboard/dashboard.component').then(
    (m) => m.DashboardComponent
  );
const AdminAllProducts = () =>
  import('@pages/admin/all-products/all-products.component').then(
    (m) => m.AllProductsComponent
  );
const AdminOrderList = () =>
  import('@pages/admin/order-list/order-list.component').then(
    (m) => m.OrderListComponent
  );

export const routes: Routes = [
  {
    path: '',
    title: 'Klock Ecommerce | Home',

    component: HomeComponent,
  },
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
        title: 'Dashboard',
        path: '',
        loadComponent: AdminDashboard,
      },
      {
        title: 'All Products',
        path: 'all-products',
        loadComponent: AdminAllProducts,
      },
      {
        title: 'Order List',
        path: 'order-list',
        loadComponent: AdminOrderList,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
