import { Component } from '@angular/core';
declare var $: any //jquery islemleri icin kullanacagiz.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce.Client';
}

// $(document).ready(()=>
// alert("jquery works!"))