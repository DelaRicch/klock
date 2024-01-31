import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  private toastSubject = new Subject<{
    res: { message: string; success: boolean };
  }>();
  toast$ = this.toastSubject.asObservable();

  showToast(res: { message: string; success: boolean }) {
    this.toastSubject.next({ res });
  }
}
