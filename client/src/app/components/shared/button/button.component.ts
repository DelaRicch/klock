import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [class]="isIcon ? 'w-9 h-9' : 'w-full h-9 bg-button' "
      class="rounded-md flex items-center justify-center gap-2 px-4 text-white hover:ring-1 ring-offset-2 hover:ring-blue focus:ring-1 focus:ring-blue outline-none"
    >
      <span class="w-4 h-4 rounded-full border-2 border-t-transparent border-slate-200 animate-spin"></span>
      {{ label }}
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label = 'button';
  @Input() isIcon = false;
}
