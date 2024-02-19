import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-icon',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alert-icon.component.html',
  styleUrl: './alert-icon.component.css'
})
export class AlertIconComponent {
@Input() status: "success" | "error" = "success";
}
