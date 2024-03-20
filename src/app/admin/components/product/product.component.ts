import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/commmon/http-client.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {

    this.showSpinner(SpinnerType.BallAtom);

    setTimeout(() => { this.hideSpinner(SpinnerType.BallAtom) }, 1000);

    //#region  Ts ile Api endpointine sorhular(get,post,put,delete) 

    // this.httpClientService.get({
    //   controller: "testcontroller/products"
    // }).subscribe(data => console.log(data));


    // this.httpClientService.post({
    //   controller: "testcontroller/newprd"},
    //   {
    //     name:"Book",
    //     stock: 100,
    //     price:50,

    //   }
    // ).subscribe();

    // this.httpClientService.put({
    //   controller:"testcontroller/updateProduct"},
    //   {
    //     id : "06bfa25c-102f-4202-9617-66eceeb3e711", //ornek id miz.
    //     name: "Updated Book",
    //     stock: 444,
    //     price: 44
    //   }
    //   ).subscribe();


    // this.httpClientService.delete({
    //   controller: "testcontroller/deleteproduct"
    // },"06bfa25c-102f-4202-9617-66eceeb3e711" //-> delete de direk header girdik body degil. header controllerden sonraki oluyor.
    // ).subscribe();

    /*Fake Api test */
    // this.httpClientService.get({ 
    //   baseUrl:"https://jsonplaceholder.typicode.com",
    //   controller:"posts"
    // }).subscribe(data=>console.log(data));
    // this.httpClientService.get({ 
    //   fullEndPoint:"https://jsonplaceholder.typicode.com/posts",
    // }).subscribe(data=>console.log(data));
    //#endregion

  }
 

}
