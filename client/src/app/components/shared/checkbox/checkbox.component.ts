import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'klock-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input() id: string = 'checkbox-id';
  @Input() label: string = 'label';
  @Input() control = new FormControl();
  @Input() isRequired: boolean = false;

  isChecked = false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    this.control.setValue(this.isChecked);
    // this.control.markAsTouched();
    // this.control.updateValueAndValidity();
  }
}
