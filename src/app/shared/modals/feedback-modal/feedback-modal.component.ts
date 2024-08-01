import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFeedbackDialogData } from '../../interfaces/feedback-dialog.interface';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './feedback-modal.component.html',
  styleUrl: './feedback-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackModalComponent { 
  readonly dialogRef = inject(MatDialogRef<FeedbackModalComponent>);
  public data = inject<IFeedbackDialogData>(MAT_DIALOG_DATA);

  constructor(
  ){

  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
