import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent  extends BaseComponent implements  OnInit {

  constructor(spinner:NgxSpinnerService){
    super(spinner)
  }   
  ngOnInit(): void {

    this.showSpinner(SpinnerType.BallAtom)

    setTimeout(() => {  //setTimmeout defult bir  fonksiyon.
      this.hideSpinner(SpinnerType.BallAtom)
    }, 3000);

    

  }

}
