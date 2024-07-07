import { inject, Injectable, signal } from "@angular/core";
import { UserInfoType } from "@type/auth.types";
import { Router } from "@angular/router";
import Cookies from "cookies-ts";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  router = inject(Router);
  userProfile = signal<Partial<UserInfoType>>({});
  cookies = new Cookies();

  setAccessToken(token: string) {
    if (!token) return;
    this.cookies.set("token", token);
    this.decodeToken(token);
  }

  decodeToken(token: string) {
    if (!token) return;
    const decodedToken = jwtDecode<UserInfoType>(token);
    localStorage.setItem("userInfo", JSON.stringify(decodedToken));
    this.setUserProfile();
  }

  setUserProfile() {
    const userInfo =
      JSON.parse(localStorage.getItem("userInfo") as string) || {};
    this.userProfile.set(userInfo);
  }

  getUserProfile() {
    return this.userProfile();
  }

  isAuthenticated() {
    const token = this.cookies.get("token") as string;
    return !!token;
  }

  logout() {
    this.cookies.set("token", null, { expires: -60 * 60 * 8 });
    this.userProfile.set({} as UserInfoType);
    this.cookies.remove("token");
    localStorage.clear();
    this.router.navigate([""]);
  }
}
