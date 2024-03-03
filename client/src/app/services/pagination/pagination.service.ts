import { ElementRef, Injectable, signal } from '@angular/core';
import { PaginationItem } from '@type/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  range = signal<PaginationItem[]>([1]);
  first = signal(0);
  next = signal(0);
  last = signal(0);
  active = signal(0);

  updateRange(
    totalPages: number,
    itemsPerPage: number,
    paginationLength: number,
    jumpStart: number
  ): void {
    const totalItems = Math.ceil(totalPages / itemsPerPage);
    const range = Array.from({ length: totalItems }, (_, i) => i + 1);
    console.log(range);
    this.range.set(range);
    this.first.set(range[0]);
    this.last.set(range[range.length - 1]);
  }

  onNext(loop: boolean, activePage: number): void {
    console.log(this.range(), 'list');
    if(loop) {
      if(activePage === this.last()) {
        this.next.set(this.first());
      } else {
        this.next.set(activePage + 1);
      }
    }
  }

  onPrevious(loop: boolean, activePage: number): void {
    if(loop) {
      if(activePage === this.first()) {
        this.next.set(this.last());
      } else {
        this.next.set(activePage - 1);
      }
    }
  }

  onCurrent(button: number){
    this.active.set(button);
  }
  
}
