import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-base',
//   standalone: true,
//   imports: [],
//   templateUrl: './base.component.html',
//   styleUrl: './base.component.scss'
// })

/* Bu componenet UI ve Admin icin  ortak bir  component */
export class BaseComponent {

  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(SpinnerNameType: SpinnerType) {
    this.spinner.show(SpinnerNameType);

    setTimeout(()=> this.hideSpinner(SpinnerNameType), 3000);
  }

  hideSpinner(SpinnerNameType: SpinnerType) {
    this.spinner.hide(SpinnerNameType);
  }
}

export enum SpinnerType {
  //app.html icindeki  ngx name's1'
  BallAtom = 's1', 
  SquareJellyBox = 's2'

}