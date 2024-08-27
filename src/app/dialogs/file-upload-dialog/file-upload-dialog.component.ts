import { Component, OnInit, Inject } from '@angular/core';
import { Basedialog } from '../base/basedialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    MatDialogModule, // Add MatDialogModule to import MatDialogActions
    MatButtonModule
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends Basedialog<FileUploadDialogComponent> {

  constructor(
    dialgRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadState
  ) {
    super(dialgRef);
  }

}
export enum UploadState {
  Yes,
  No
}
