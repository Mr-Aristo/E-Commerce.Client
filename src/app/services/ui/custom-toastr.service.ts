import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'  //burasi root oldugunda otomatik man IoC a eklenecektir
})
/*Normalde Toastr'i ozellestirmeye gerek yok cunku kendine ait zaten bir servisi var
ornek olmasi bakimindan yinede ozellestiriyoruz.
*/
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  //message(message: string, title: string, messageType: ToastrMessageType, position: ToastrPosition) {
  message(message: string, title: string, options: Partial<CustomToastOptions>) {
    this.toastr[options.MessageType](message, title, {
      positionClass:options.Position //positionClass 
    });//{} icinde js objesi olusturulur Toast classi

  }
}

export class CustomToastOptions{ //Burda degereleri ts bir default degeri zorunlu kildigi icin verdik tsconfig,json dan kapatilabilir.
  //tsconfig.json da "strict" false ile kapatilabilir.
  MessageType:ToastrMessageType ;
  Position : ToastrPosition; 


  
}

export enum ToastrMessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export enum ToastrPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}