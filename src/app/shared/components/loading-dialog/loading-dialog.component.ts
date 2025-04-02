import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-dialog',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatProgressSpinner,
  ],
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.scss'
})
export class LoadingDialogComponent {
  constructor() {}
}
