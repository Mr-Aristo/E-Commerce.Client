import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from './services/admin/alertify.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UIModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ { provide: 'root', useClass: AlertifyService }], // IOS containera singleton nesne olarak atadik. Bu bir DI dir. 
  bootstrap: [AppComponent]
})
export class AppModule { }
