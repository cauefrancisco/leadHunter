import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../../shared/modules/material.module';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DetailsModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DetailsModalComponent>);
  public data = inject<any>(MAT_DIALOG_DATA);
  constructor() { }

  ngOnInit() {
    console.log('data details: ', this.data);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
