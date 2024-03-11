import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  //Inject edilen baseUrl app.modul providers icinde tanimlandi.
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  //Burda requestParameter doluysa onu degilde @inject ile gelen ana moduldeki url i kullan seklinde sartladik.
  private URL(requestParameter: Partial<RequestParameters>): string {
    // `${}` string interpolation 
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}
    /${requestParameter.controller}
    ${requestParameter.action ? `/${requestParameter.action}` : ""}`;
    /*Buradaki sartin amaci eger action yoksa / koymamasi varsa / ile koymmasi*/
  }

  /*Id parametresi genel bir islem olmadigi icin ayri olark verdik*/
  public get<T>(requestParameter: Partial<RequestParameters>, id?: string) {

    let url: string = "";

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    }
    else {
      /*id varsa id kullan yoksa bos gec sarti. string interpolation*/
      url = `${this.URL(requestParameter)}/${id ? `/${id}`: ""}`;
    }

    return this.httpClient.get<T>(url,{headers:requestParameter.headers});

  }

  post() {

  }

  put() {

  }

  delete() {

  }


}

//Fonksiyon icinde parametre almak saglikli olmadigi icin nesne ile aldik.
export class RequestParameters {
  controller?: string;
  action?: string;
  id?: string;
  headers?: HttpHeaders;
  baseUrl?: string; // baseURl degisme olasiligina karsi olusturuldu
  fullEndPoint?: string;
}