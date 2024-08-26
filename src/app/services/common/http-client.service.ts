import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/* Bu serviste parametereler , ile degil objeler araciligiyle gonderildi. Bu kullanim en dogru kullanimdir. */
export class HttpClientService {

  //Inject edilen baseUrl app.modul providers icinde tanimlandi.
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  //Burda requestParameter doluysa onu degilde @inject ile gelen ana moduldeki url i kullan seklinde sartladik.
  private URL(requestParameter: Partial<RequestParameters>): string {
    // Use ternary operators to conditionally include parts of the URL
    return `${requestParameter.baseUrl || this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
    /*Buradaki sartin amaci eger action yoksa / koymamasi varsa / ile koymmasi*/
  }


  /*Id parametresi genel bir islem olmadigi icin ayri olark verdik*/
  public get<T>(requestParameter: Partial<RequestParameters>, id?: string) {

    let url: string = "";

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    }
    else {
      /*id varsa id kullan yoksa bos gec sarti. ayni sekilde querystring icinde gecerli. string interpolation*/
      url = `${this.URL(requestParameter)}${id ? `/${id}` : ""}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }

    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }



//body gonderilecek verinin kendisidir.
  post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> { // Tip guvenligi saglamak adina T tipinide partial olarak ayarladik.
    let url: string = "";

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.URL(requestParameter)} ${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return this.httpClient.post<T>(url, body, { headers: requestParameter.headers });
  }

  //Update islemi bodyden saglanacagi icin id parametre olarak alinmadi.
  put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Observable<T> {

    let url: string = "";

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.URL(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
    }
    return this.httpClient.put<T>(url, body, { headers: requestParameter.headers });

  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = "";

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
    url = `${this.URL(requestParameter)}/${id} ${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
      //console.log(url);
    }
    return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }


}

//Fonksiyon icinde parametre almak saglikli olmadigi icin nesne ile aldik.
export class RequestParameters {
  controller?: string;
  action?: string;
  id?: string;
  queryString?: string;
  headers?: HttpHeaders;
  baseUrl?: string; // baseURl degisme olasiligina karsi olusturuldu
  fullEndPoint?: string;
}