import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'klock-eye',
  standalone: true,
  imports: [NgIf],
  templateUrl: './eye.component.html',
  styleUrl: './eye.component.css',
})
export class EyeComponent {
  @Input() showContent: boolean = false;
}
