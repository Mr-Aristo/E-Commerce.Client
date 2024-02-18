import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from 'src/app/admin/components/product/product.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductModule,
    BasketsModule,
    HomeModule
  ],
  exports: [
   ProductModule,
   BasketsModule,
   HomeModule 

  ]
})
export class ComponentsModule { }
