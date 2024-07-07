import {
  animate,
  animation,
  style,
  transition,
  trigger
} from "@angular/animations";

export const fadeTransitionAnimation = trigger("fadeTransition", [
  transition(
    ":enter",
    animation([
      style({ opacity: 0, transform: "translateY(-40px)" }),
      animate(
        "250ms ease-in",
        style({ opacity: 1, transform: "translateY(0)" })
      )
    ])
  ),
  transition(
    ":leave",
    animation([
      animate(
        "250ms ease-out",
        style({ opacity: 0, transform: "translateY(-40px)" })
      )
    ])
  )
]);
