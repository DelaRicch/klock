import { Component, HostBinding } from "@angular/core";
import { NavigationEnd, Router, RouterLinkActive } from "@angular/router";
import { SidebarIconComponent } from "@components/admin/sidebar-icon/sidebar-icon.component";
import { ButtonComponent } from "@components/shared/button/button.component";
import { LogoComponent } from "@icons/logo/logo.component";
import { cn } from "../../../helpers/helpers";

@Component({
  selector: "klock-sidebar",
  standalone: true,
  imports: [
    ButtonComponent,
    LogoComponent,
    SidebarIconComponent,
    RouterLinkActive
  ],
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  cn = cn;
  activeRoute = "";
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  sidebarItems = [
    { id: 1, name: "Dashboard", icon: "dashboard", path: "admin-dashboard" },
    {
      id: 2,
      name: "All Products",
      icon: "all-products",
      path: "admin-dashboard/all-products"
    },
    {
      id: 3,
      name: "Order List",
      icon: "order-list",
      path: "admin-dashboard/order-list"
    }
  ];

  @HostBinding("class") get hostClass() {
    return "bg-[#F9FAFB] border-r h-full hidden md:flex md:flex-col gap-2 justify-between md:w-[180px] lg:w-[254px] px-1.5 py-3 border-[#D0D5DD]";
  }

  handleNavigateRoute(path: string) {
    this.router.navigate([`/${path}`]);
  }

  handleGoBackHome() {
    this.router.navigate([""]);
  }

  handleLogOut() {}
}
