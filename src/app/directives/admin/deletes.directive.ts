import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, inject, input } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { BaseComponent } from 'src/app/base/base.component';

declare var $: any; //javascript declare jquery 

/*Bu direktiv genel silme islemi icindir. Direktivler genel isler icin kullanilir */
@Directive({
  selector: '[Deletes]',
  standalone: true,
})

export class DeletesDirective {

  constructor(
    /*Direktifi kullangimiz html nesnesini ElementRef ile getirdik*/
    private element: ElementRef,
    /*gelen elementi manipule edebilmek icinde Renderer2 */
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
  ) {
    /*td icinde img yollamak icin bir html elementi yaratiyoruz.
    assagidaki <img> kismini js ile tanimlanmasi bu sekilde.
    */
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/clearIcon.png");

    // <img src="../../../../../assets/clearIcon.png" (click)="delete(element.id,$event)" > 
    img.setAttribute("style", "cursor:pointer;");//cursoru img uzerine geldiginde degistirdik.
    img.width = 25;
    img.height = 25;

    /*son olarak da manipule edilen elementi assagidaki sekilde render ediyoruz */
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() controller: string;//Genel bir yapi kullandigimiz icin bunuda direktifin cagirildigi yerden aliyoruz.
  @Input() id: string; //html deki idyi bu sekilde yakalariz. list.html deki [id] = "element.id" kismi. Direktifin cagirildigi yerden aldik.
  @Output() callback: EventEmitter<any> = new EventEmitter();
  /*Hostlistener tiklanma eventi calistiginda calisacak kisim
  yani td ye tiklanildiginda silme islemi icin gereken mantik calistirilacak.
  */
  @HostListener("click")
  async onClick() {
    this.openDialog(async () => { // ()=> {} bu callback fonskiyonu eger islem yes ise bu sekilde onCLick tetiklenecek.
      //onClick asybc bu yuzden callback de async olmali
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {

        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700,
          () => {
            this.callback.emit();// EventEmit turundeki fonksiyonlari bu sekilde tetikleriz.
            this.alertifyService.message("Product Deleted!", //options parametresi
              {
                messageType: MessageType.Success,
                position: Positions.TopRight
              }
            )
          })//jquery ile row u  animasyon ile siliyoruz.
      }, //error parametresi
        (errorResponse: HttpErrorResponse) => {
          this.alertifyService.message("Product could not deleted. Something went wrong.", //options parametresi
            {
              messageType: MessageType.Error,
              position: Positions.TopRight
            }
          )
        }
      );
    });
  }

  //Delete dialog paneli. Drective araciligiyla kullandik.
  //openDialogu tetiklendikten ve assagidaki sart Yes ise onClickdeki silme islemi gerceklestirecegiz.
  //Ya yukardaki islemi asagiya tasiyacaz yada callback fonksiyonu ile parametre olarak gececegiz.
  //afterClose bir callback fonksiyonu.
  openDialog(afterClose: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == DeleteState.Yes) {
        afterClose(); //eger yes ise fonksiyon tetiklenecek.
      }
    });
  }

}



