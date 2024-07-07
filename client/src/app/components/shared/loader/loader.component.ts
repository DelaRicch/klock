import { Component, input } from "@angular/core";

@Component({
  selector: "klock-loader",
  standalone: true,
  imports: [],
  template: `<div class="loader"
  [style]="'border-right-color:' + color() + '; width: ' + width() + 'rem;'"
>
  </div>`,
  styleUrl: "./loader.component.css"
})
export class LoaderComponent {

  color = input("#0306BA");
  width = input(2)

}
