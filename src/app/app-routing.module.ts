import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';


const routes: Routes = [
  //-------------Admin Layer
  {
    path: "admin", component: LayoutComponent,              //Admin kismina ait Layout.Admin kismi altinda calisacak comp. lar children olarak bildirilir. 
    children:
      [
        {path:"",component:DashboardComponent },//=> main bir sayfa belirlerken bu sekilde bos path ve baslatilacak component belirlenir. Bu bizimz baslatilacak default sayfamiz.
        {
          path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then
            (module => module.CustomerModule)
        }, //customers pathi geldiginde bununla ilgili pathleri ekle anlamina geliyor.
        //Burda yapilan http://..com/admin/customerrs istegi geldiginde geri kalanlari bu path altinda arasini sagladik.Birden fazla component varsa otomatikman burdan calistiracak

        {
          path: "products", loadChildren: () => import("./admin/components/product/product.module").then
            (module => module.ProductModule)
        },

        {
          path: "orders", loadChildren: () => import("./admin/components/order/order.module").then
            (module => module.OrderModule)
        } 
      ]
  },
  //-------------Admin Layer
 
  //-------------UI Layer 
  {path:"",component:HomeComponent}, // Ana sayfa ui default
  {
    path: "basket", loadChildren:()=> import("./ui/components/baskets/baskets.module").then
    (module=>module.BasketsModule)
  },
  {
    path:'products',loadChildren:()=>import("./ui/components/products/products.module").then
    (module=> module.ProductsModule)
  }
  //-------------UI Layer
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
