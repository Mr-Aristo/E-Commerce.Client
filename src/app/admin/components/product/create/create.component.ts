import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload-service/file-upload-service.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  // standalone: true,
  //imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }


  /*
  Create Componentin ana compu ProductCom.
  Output ile butona tiklandiignda produccomp araciligiyla listComp tetiklenecek
  busayede yeni bir urun eklendiginde otomatik listeye eklenecek.
  Bu eventi bu coponenti referans eden componentte cagiracaz.
  Product.html icinde.
   */
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = { //Disariya gidecegi icin output
    controller:'testcontroller',
    action: 'upload', //Bu kisim apide [action] seklinde belirtildi. action benzersiz olmali.
    explanation:'Select the pictures',
    isAdminPage:true,
    accept:'.pdf,.png, .jpg, .jpeg'
  };

  //html inputunu gonmderdigimiz icin turunu bu sekilde tanimladik. #name <- hmtl adi
  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();

    create_product.name = name.value;
    create_product.stock = parseInt(stock.value); //stokc.value string olarak gelir burde int donustu
    create_product.price = parseFloat(price.value);



    //hide spinner servicede createProduct icinde any tipinde tanimlamis oldugumuz deger true oldugunda devereye girecek
    //amac nngx i tekrar service icinde cagirmamak.
    this.productService.createProduct(create_product, () => { // ()=>{} ile true olursa birden fazla islem calistiracak. Bu olmasaydi this. ile tek islem yapardik.
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Product Added", {
        messageType: MessageType.Success,
        position: Positions.ButtomRight
      });
      /*
      Event. Ne firlatacaksak onu istiyor.
      <app-create (createdProduct)="createdProduct($event)">
      crete_product u $event ile yakaladdik.
      */
      this.createdProduct.emit(create_product);

    },
      errorMessage => {
        this.alertify.message(errorMessage, {
          messageType: MessageType.Error,
          position: Positions.ButtomRight
        }
        )
      }
    );

    /*burda girilen inputlari islem bittikten sonra inbox dan sildik.*/
    name.value = '';
    stock.value = '';
    price.value = '';



  }

}
