import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PaginationService } from '@services/pagination/pagination.service';
import { PaginationItem } from '@type/types';

@Component({
  selector: 'klock-pagination',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, AsyncPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate(
          '0.3s ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease-in-out',
          style({ opacity: 0, transform: 'translateX(10px)' })
        ),
      ]),
    ]),
  ],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 1;
  @Input() itemsPerPage: number = 1;
  @Input() jumpStart: number = 5;
  @Input() paginationLength: number = 7;

  range = signal<PaginationItem[]>([0]);
  activePage = signal(1);

  constructor(private paginationService: PaginationService) {}

  renderItem(index: number) {
    const isBefore = index < this.range().indexOf(this.activePage());
  }

  ngOnInit(): void {
    this.paginationService.updateRange(this.totalPages, this.itemsPerPage, this.paginationLength, this.jumpStart);
    this.range = this.paginationService.range;
  }
}
