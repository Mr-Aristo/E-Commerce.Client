//Genel islemleri yapmak icin bir class belirledik.
//Close islemi her dialogda olacagi icin DRY olark base de merkezilestirdik.
//Burada Generic bir yapi kurduk DialogComponent <T> ye karsilik gelir her ismi alabilir.
import { MatDialogRef } from "@angular/material/dialog";

export class Basedialog<DialogComponent> {

    constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

    close() {
        this.dialogRef.close();
    }
    
}
