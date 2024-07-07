import Cookies from 'cookies-ts';
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { jwtDecode } from "jwt-decode";
import { HeaderComponent } from "@components/shared/header/header.component";
import { HeroComponent } from "@components/home/hero/hero.component";
import { UserInfoType } from '@type/auth.types';
import { BestSellingWatchesComponent } from "../../components/home/best-selling-watches/best-selling-watches.component";

@Component({
    selector: "klock-home",
    standalone: true,
    template: ` <klock-header></klock-header>
    <klock-hero></klock-hero>
    <klock-best-selling-watches></klock-best-selling-watches>
    `,
    imports: [HeaderComponent, HeroComponent, BestSellingWatchesComponent]
})
export class HomeComponent implements OnInit {
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  cookies = new Cookies();
  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParams["token"];
    if (accessToken) {
      const decodedToken = jwtDecode<UserInfoType>(accessToken);
      localStorage.setItem("userInfo", JSON.stringify(decodedToken));
      this.cookies.set("token", accessToken);
      this.authService.setUserProfile();
      window.location.href = "/";
    }
  }
}
