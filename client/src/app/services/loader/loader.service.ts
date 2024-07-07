import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  inlineLoader = signal(false);

  setInlineLoader(value: boolean) {
    this.inlineLoader.set(value);
  }

  getInlineLoader() {
    return this.inlineLoader();
  }
}
