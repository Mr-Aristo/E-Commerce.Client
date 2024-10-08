import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, DialogPosition } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(private dialog: MatDialog) { }

  //partial yaplidiginde parametre obje olarak girebilir.
  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.postion,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == dialogParameters.data) {
        dialogParameters.afterClosed(); //eger yes ise fonksiyon tetiklenecek.
      }
    });
  }

}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options?: Partial<DialogOptions> = new DialogOptions();
}
export class DialogOptions {
  width?: string = "250px";
  height?: string;
  postion?: DialogPosition;
}