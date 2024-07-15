import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    DashboardModule,
    RouterModule,
    
  ],
  exports:[
    ProductModule,
    OrderModule,
    CustomerModule,
    DashboardModule
  ]
})
export class ComponentsModule { }
