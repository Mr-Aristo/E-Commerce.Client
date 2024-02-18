import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any //jquery islemleri icin kullanacagiz.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce.Client';
  constructor(private toastr: ToastrService){
    this.toastr.success('dsa','dasdsasadadddas');
  }
}

// $(document).ready(()=>
// alert("jquery works!"))
