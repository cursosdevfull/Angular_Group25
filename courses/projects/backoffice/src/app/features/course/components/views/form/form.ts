import { Component, inject, Inject, signal } from '@angular/core';
import { form, FormField, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface ICourse {
  name: string;
  level: string;
}

@Component({
  selector: 'cdev-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormField, MatDialogModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  data = inject(MAT_DIALOG_DATA)

  model = signal<ICourse>({
    name: this.data ? this.data.name : '',
    level: this.data ? this.data.level : ''
  })

  schema = (schema: SchemaPathTree<ICourse>) => {
    required(schema.name, { message: 'Name is required' })
    required(schema.level, { message: 'Level is required' })
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' })
    minLength(schema.level, 3, { message: 'Level must be at least 3 characters' })
  }

  form = form(this.model, this.schema)

  constructor() {
    console.log(this.model())
  }
}
