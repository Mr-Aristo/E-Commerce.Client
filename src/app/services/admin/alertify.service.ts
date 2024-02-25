import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
                                                                          
 // message(message: string, messageType: MessageType, position: Positions, delay: number = 3/*default deger*/) { // js metotlari da ilgili sinifin indexleri uzerinden tetikleye biliyoruz.
  message(message: string, options: Partial<AlertifyOptions> ) {//Class  kullanarak daha dogurum bir kullanim yaratmis olduk.
 //Partial<class> seklinde vermemizin sebebi bu fonksiyonu cagiracagimizda AlertifyOption classi cagirilacak yerde obj olusturmamiz, icine istenen
 //degerleri atmamiz gerekiyor. Partial ile Dashbord component deki gibi direk parametre icinde obje degeri ataya biliyoruz.
    alertify.set('notifier', 'delay', options.delay); // delay notifikasyonun suresi
    alertify.set('notifier', 'position', options.position);
   if(options.messageType){
    alertify[options.messageType](message); //ornegin calisma sekli alertify.error() yada messageType neyse onu getirerek calistiracak. 
   }
   else {
    console.error("MessageType not provided in options.");
   }
  }

  dissmiss(){
    alertify.dissmiss(); 
  }
  

}

export class AlertifyOptions {//TS de class elemanlarinin bir default degeri olmak zorundadir,angular kati kontrol. tsconfig.json da "strict" false ile kapatilabilir, 
  messageType: MessageType = MessageType.Message ;
  position: Positions = Positions.ButtomLeft;
  delay : number = 3;

}

export enum MessageType //js de enum larqa string deger verilebilir.
{
  /*index  =  value */
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
//Angularda genelde birseyi parametrik hale getirmek icin enum kullanilir.

export enum Positions {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  ButtomCenter = "buttom-center",
  ButtomRight = "buttom-right",
  ButtomLeft = "buttom-left"

}

//Burada alertify metodlarini costumize ediyoruz. Cunku alertify kutuhanesi eklenmesine ragmen eger kullanilmak istenen ffonk. Bilinmiyorsa
// . ya bastigimizde gostermiyor. enum kullanarak mesaj tiplerini parametre olarak aldik. Bu sayede diger componentlerde kullanimi pratik olacak.