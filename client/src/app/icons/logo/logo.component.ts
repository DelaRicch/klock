import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
 @Input() labelColor = "#1D2939";
 @Input() outerColor = "";
 @Input() innerColor = "#1D2939";
}
