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

    setTimeout(() => { this.hideSpinner(SpinnerType.BallAtom) }, 3000);


    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data));

  }

}
