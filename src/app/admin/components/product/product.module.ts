import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatSidenavModule} from '@angular/material/sidenav';  //Html kismindakiyapiyi kullanmak icin import edildi.
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ProductModule { }
