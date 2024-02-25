import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent  implements  OnInit {

  constructor(private spinner :NgxSpinnerService){}   
  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {  //setTimmeout defult bir  fonksiyon.
      this.spinner.hide()
    }, 3000);

  }

}
