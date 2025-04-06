import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-validation-errors',
  imports: [],
  templateUrl: './validation-errors.component.html',
  styleUrl: './validation-errors.component.scss',
})
export class ValidationErrorsComponent {
  @Input() validationErrors!: string[];
}
