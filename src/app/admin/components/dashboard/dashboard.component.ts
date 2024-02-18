import { Component,OnInit } from '@angular/core';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  constructor(private alertify: AlertifyService){}

  ngOnInit(): void {//ngOninit icinde cagirilmazsa  alertify kullanamayiz. Yada fonk icinde tanimlanmali.
    
   // this.alertify.message("nottifcation",MessageType.Success,Positions.TopRight,4)
   this.alertify.message("My sent Message ",{
    messageType:MessageType.Success,
    position:Positions.TopRight,
    delay:4 ,
  })//{} icindeki data tanimlamasinin Partial sayesinde yaptik.

    this.alertify.dissmiss 
  }


}
