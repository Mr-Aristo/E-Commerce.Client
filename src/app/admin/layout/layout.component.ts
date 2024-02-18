import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  
  constructor(private alertify: AlertifyService){}

  ngOnInit(): void {//ngOninit icinde cagirilmazsa  alertify kullanamayiz.
    
    // this.alertify.message("nottifcation",MessageType.Success,Positions.TopRight,4)
    // this.alertify.dissmiss 
  }

}


