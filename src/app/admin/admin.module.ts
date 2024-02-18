import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AdminComponent
   
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule
  ],
  exports:[
    LayoutModule //export islemi module veya component icin olabilir. 
  ]
})
export class AdminModule { }
