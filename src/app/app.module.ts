import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from './services/admin/alertify.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';


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
    NgxSpinnerModule,
    HttpClientModule,

  ],
  providers: [
    // IOS containera singleton nesne olarak atadik. Bu bir DI dir. 
  {provide: 'root', useClass: AlertifyService },
  //API islemi icin kullanilacak olan baseURl'i tanimmladik. @inject ile baseurl i cekicez.
  { provide: "baseUrl", useValue: "https://localhost:7207/api", multi: true }
], 
  bootstrap: [AppComponent]
})
export class AppModule { }
