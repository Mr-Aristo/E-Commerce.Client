import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Basedialog } from '../../base/basedialog';
//angularMaterial-Dialog
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule, // Add MatDialogModule to import MatDialogActions
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush // Add this line if you want to use OnPush change detection strategy
})

export class DeleteDialogComponent extends Basedialog<DeleteDialogComponent> {

  constructor(
    override dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState
  ) {
    super(dialogRef); // super ile BaseDialog'un constructor'una ref göndermek zorundayız.
  }

}

export enum DeleteState {
  Yes,
  No
}
