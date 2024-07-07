import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'klock-best-selling-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './best-selling-item.component.html',
  styleUrl: './best-selling-item.component.css',
})
export class BestSellingItemComponent {}
