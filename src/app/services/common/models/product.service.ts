import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/product/create_product';

@Injectable({
  providedIn: 'root'
})

//Product endpoints 
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  //POST un icinde action"apideki post adi" bir controllerda birden fazla post varsa kullanilmalidir. 
  createProduct(product: Create_Product){
    this.httpClientService.post({
      controller:"testcontroller/newprd"
    },product)
    .subscribe(result=>{alert("Product added!")}) 

  }
}
