import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RouteTitleService {
  setTitle(title: string) {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        document.title = "You've been missed at Klock!";
      } else {
        document.title = title;
      }
    });
  }
}
