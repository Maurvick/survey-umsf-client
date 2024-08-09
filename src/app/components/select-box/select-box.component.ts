import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-box.component.html',
  styleUrl: './select-box.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent {
  @Input({ required: true }) arr: any[] = [];
  @Input({ required: true }) key: string = '';

  @Output() selectionChange = new EventEmitter<{ id: string; value: string }>();

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  writeValue(value: string): void {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  hasObject() {
    return this.arr.some(
      (item) => item && typeof item === 'object' && !Array.isArray(item)
    );
  }

  onSelectionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectionChange.emit({ id: this.key, value: selectElement.value });
  }
}
