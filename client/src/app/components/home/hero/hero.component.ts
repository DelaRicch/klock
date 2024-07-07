import { DomSanitizer } from "@angular/platform-browser";
import { Component, HostBinding, inject, signal } from "@angular/core";
import { ButtonComponent } from "@components/shared/button/button.component";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { cn } from "@helpers/helpers";
import { heroSlideImages } from "@constants/media.store";
import {
  animate,
  animation,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "klock-hero",
  standalone: true,

  animations: [
    trigger("carouselAnimation", [
      transition(
        "void=>*",
        [
          animation([
            style({
              opacity: 0,
              transform: `scale(0.8) translateX({{ direction }})`
            }),
            animate(
              "750ms",
              style({ opacity: 1, transform: "scale(1) translateX(0)" })
            )
          ])
        ],

        {
          params: {
            direction: ""
          }
        }
      )
    ])
  ],

  template: `
    @for (slide of heroSlideImages; track slide.title) {
      @if ($index === currentIndex) {
        <ng-container>
          <div
            [@carouselAnimation]="{
              value: currentIndex,
              params: {
                direction: animationDirection() === 'right' ? '-100%' : '100%'
              }
            }"
            class="absolute w-full h-full left-0 top-0 -z-10"
            [style]="{ background: 'url(' + slide.src + ') center/cover' }"
          ></div>
        </ng-container>
      }
    }
    <section
      class="w-11/12 h-3/6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col gap-4 items-center justify-end pb-6 z-10"
    >
      <section class="flex items-center justify-between w-full text-white">
        <klock-button
          (buttonClick)="previousSlide()"
          className="rounded-full w-[3rem] h-[3rem] bg-white"
        >
          <klock-svg-icon
            ngProjectAs="button-icon"
            color="black"
            stroke="black"
            svgName="arrow-left"
            class="transform scale-75"
          ></klock-svg-icon>
        </klock-button>
        @for (slide of heroSlideImages; track slide.title) {
          @if ($index === currentIndex) {
            <ng-container>
              <div
                [@carouselAnimation]="{
                  value: currentIndex,
                  params: {
                    direction:
                      animationDirection() === 'right' ? '170%' : '-170%'
                  }
                }"
                class="flex flex-col items-center"
              >
                <span class="flex flex-col gap-2 items-center w-9/12">
                  <span class=" uppercase font-bold text-white text-4xl">{{
                    selectedSlide().title
                  }}</span>
                  <p class="text-white font-bold text-lg text-center line-clamp-4">
                    {{ selectedSlide().description }}
                  </p>
                </span>
              </div>
            </ng-container>
          }
        }

        <klock-button
          (buttonClick)="nextSlide()"
          className="rounded-full w-[3rem] h-[3rem] bg-white"
        >
          <klock-svg-icon
            ngProjectAs="button-icon"
            color="black"
            stroke="black"
            svgName="arrow-left"
            class="transform rotate-180 scale-75"
          ></klock-svg-icon>
        </klock-button>
      </section>

      <klock-button
        className="text-white font-semibold rounded-lg w-max capitalize bg-blue-B600 cursor-pointer"
      >
        <span ngProjectAs="button-label">Get Started</span>
      </klock-button>
    </section>
  `,
  imports: [ButtonComponent, SvgIconComponent]
})
export class HeroComponent {
  sanitizer = inject(DomSanitizer);
  heroSlideImages = heroSlideImages;
  cn = cn;
  selectedSlide = signal(heroSlideImages[0]);
  selectedImage = signal(0);
  animationDirection = signal<"right" | "left">("right");
  currentIndex = 0;

  previousSlide() {
    this.animationDirection.set("left");
    this.currentIndex =
      (this.currentIndex - 1 + this.heroSlideImages.length) %
      this.heroSlideImages.length;
    this.selectedSlide.set(this.heroSlideImages[this.currentIndex]);
    this.selectedImage.set(this.selectedImage() - 1);
  }

  nextSlide() {
    this.animationDirection.set("right");
    this.currentIndex = (this.currentIndex + 1) % this.heroSlideImages.length;
    this.selectedSlide.set(this.heroSlideImages[this.currentIndex]);
    this.selectedImage.set(this.selectedImage() + 1);
  }

  @HostBinding("class") get hostClass() {
    return "w-full hidden md:block h-[38rem] relative after:absolute after:w-full after:h-full after:bg-background-shadow";
  }
}
