import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any //jquery islemleri icin kullanacagiz.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce.Client';
  constructor(private customToastr: CustomToastrService) {
    //this.customToastr.message('test', 'Baslik', ToastrMessageType.Success,ToastrPosition.BottomFullWidth);
    this.customToastr.message('test', 'Baslik', {
      MessageType: ToastrMessageType.Success,
      Position: ToastrPosition.BottomFullWidth,
    });
  }
}

/*CORS icin olusturdugumuz js kodu. Cors bu yonlendirmeyi engeller. API den ayar yapilmmamsi gerek */
// $.get("https://localhost:7207/api/testcontroller/products",data=>{
//   console.log(data);
// })

// $(document).ready(()=> npm install ngx-spinner --save
// alert("jquery works!"))
