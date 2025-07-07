import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../store/actions';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'task-form',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          <mat-option value="pending">Pending</mat-option>
          <mat-option value="completed">Completed</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">{{ submitLabel }}</button>
      <button mat-button type="button" (click)="cancel.emit()">Cancel</button>
    </form>
  `,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class TaskFormComponent implements OnChanges {
  @Input() initialTask: Task | null = null;
  @Input() submitLabel = 'Add';
  @Output() save = new EventEmitter<Omit<Task, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: '',
      status: 'pending',
    });
  }

  ngOnChanges() {
    if (this.initialTask) {
      this.form.patchValue(this.initialTask);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as Omit<Task, 'id'>);
      this.form.reset({ title: '', status: 'pending' });
    }
  }
}
