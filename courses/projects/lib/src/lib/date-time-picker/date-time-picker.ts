import { Component, computed, input, model } from '@angular/core';
import { ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cdev-lib-date-time-picker',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.css',
})
export class DateTimePicker {
  value = model<string>('');

  label = input('');

  touched = model(false);
  disabled = input(false);
  invalid = input(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  required = input(false);

  protected selectedDate = computed<Date | null>(() => this.parseDateTime(this.value()));
  protected selectedTime = computed<string>(() => this.toTimeValue(this.selectedDate()));

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const pickedDate = event.value;
    if (!pickedDate) {
      this.value.set('');
      return;
    }

    const current = this.selectedDate();
    const next = new Date(pickedDate);
    if (current) {
      next.setHours(current.getHours(), current.getMinutes(), 0, 0);
    } else {
      next.setHours(0, 0, 0, 0);
    }

    this.value.set(this.toDateTimeLocal(next));
  }

  onTimeChange(timeValue: string) {
    if (!timeValue) return;

    const [hours, minutes] = timeValue.split(':').map((part) => Number.parseInt(part, 10));
    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return;

    const current = this.selectedDate() ?? new Date();
    const next = new Date(current);
    next.setHours(hours, minutes, 0, 0);

    this.value.set(this.toDateTimeLocal(next));
  }

  onBlur() {
    this.touched.set(true);
  }

  private parseDateTime(value: string): Date | null {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private toDateTimeLocal(value: Date): string {
    return `${value.getFullYear()}-${this.pad(value.getMonth() + 1)}-${this.pad(value.getDate())}T${this.pad(value.getHours())}:${this.pad(value.getMinutes())}`;
  }

  private toTimeValue(value: Date | null): string {
    if (!value) return '';

    return `${this.pad(value.getHours())}:${this.pad(value.getMinutes())}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
