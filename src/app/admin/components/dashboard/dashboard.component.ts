import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit{
  
  constructor(private alertify: AlertifyService,spinner:NgxSpinnerService){
    super(spinner);
  }

  ngOnInit(): void {//ngOninit icinde cagirilmazsa  alertify kullanamayiz. Yada fonk icinde tanimlanmali.
    
   // this.alertify.message("nottifcation",MessageType.Success,Positions.TopRight,4)
  //  this.alertify.message("My sent Message ",{
  //   messageType:MessageType.Success,
  //   position:Positions.TopRight,
  //   delay:4 ,
  // })//{} icindeki data tanimlamasinin Partial sayesinde yaptik.

    // this.alertify.dissmiss 

    // this.showSpinner(SpinnerType.BallAtom);
    // setTimeout(()=>{this.hideSpinner(SpinnerType.BallAtom)},3000)
  }


}
