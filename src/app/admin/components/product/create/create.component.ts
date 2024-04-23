import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';
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

    },
      errorMessage => {
        this.alertify.message(errorMessage, {
          messageType:MessageType.Error,
          position:Positions.ButtomRight
        }
        )
      }
    );


  }

}
