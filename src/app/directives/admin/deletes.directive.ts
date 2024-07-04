import { Directive, ElementRef, HostListener, Input, Renderer2, input } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ :any; //javascript declare

@Directive({
  selector: '[Deletes]',
  // standalone: false
})

export class DeletesDirective {

  constructor(
    /*Direktifi kullangimiz html nesnesini ElementRef ile getirdik*/
    private element: ElementRef,
    /*gelen elementi manipule edebilmek icinde Renderer2 */
    private _renderer: Renderer2,
    private productService: ProductService
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

  @Input() id:string; //html deki idyi bu sekilde yakalariz. list.html deki [id] = "element.id" kismi. 

  /*Hostlistener tiklanma eventi calistiginda calisacak kisim
  yani td ye tiklanildiginda silme islemi icin gereken mantik calistirilacak.
  */
  @HostListener("click")
  async onClick(){
 
    const td : HTMLTableCellElement =this.element.nativeElement;
    await this.productService.delete(this.id);
    console.log(this.id);
    $(td.parentElement).fadeOut(2000); //jquery ile row u  animasyon ile siliyoruz.
  }
}
