import { Component } from '@angular/core';
import { PaginationComponent } from '@components/shared/pagination/pagination.component';

@Component({
  selector: 'klock-home',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
