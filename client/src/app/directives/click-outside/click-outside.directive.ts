import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output
} from "@angular/core";

@Directive({
  selector: "[klockClickOutside]",
  standalone: true
})
export class ClickOutsideDirective {
  elementRef = inject(ElementRef);
  hideOpenComponent = output<boolean>();

  @HostListener("document:click", ["$event"]) onDocumentClick(e: Event) {
    if (!this.elementRef.nativeElement.contains(e.target)) {
      this.hideOpenComponent.emit(false);
    }
  }
  constructor() {
    document.body.click();
  }
}
