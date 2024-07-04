import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { List_Products } from 'src/app/contracts/product/list_product';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Product endpoints. Product ile ilgili genel islemler bu serviste yapilmakta.
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  //POST un icinde action"apideki post adi" bir controllerda birden fazla post varsa kullanilmalidir. 
  createProduct(product: Create_Product, successCallBack?: () => void, erroCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "testcontroller/newprd"
    }, product)
      .subscribe(result => {//subscribe fonk ikince parametresi erorrlari alir.
        successCallBack();  //burdaki islem spinneri durdurmak. Any degeri verdikki burada verilen ne ise gecerli olsun.
        // Tekrar burada spinner cagirmamak icin yapilan bir metod. 
      },
        (errorResponse: HttpErrorResponse) => {
          //Gelen hatayi karsilayacak bir yapi olusturduk. Ts nin nimeti degiskenimize kendi formatimiz belirdik.
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          erroCallBack(message);
        });
  }

  /*successCallback ve digeri delegate parametrelerdir */
  /*successCallback geriye birsey dondurmeyen fonksiyon, yine islemin basarili olup olmadiginin kontrolu icin tanimlandi */
  /*page ve size listeletem islemindeki secilen araliga gore veri cekmek icin alinmis parameterelerdir.*/
  async list(page: number = 0, size: number = 5, successCallBack?:
    () => void, erroCallBack?: (errorMessage: string) => void):
    Promise<{ totalCount: number, products: List_Products[] }> {// async Task<T> gibi burada da Promise<T> seklinde tanimlanmali.
    /*Promise<{ totalCount: number, products: List_Products[] }> bu format apiden gelecek olan format.
      ERROR : totalCount ve products isimleri jsondan yani apiden gelen
      isimle ayni olmazsa undefined hatasi aliriz ve verileri fronta cekemeyiz.
     */
    try {
      const promiseData: Promise<{ totalCount: number, products: List_Products[] }> = this.httpClientService.get<{ totalCount: number, products: List_Products[] }>({
        controller: "testcontroller/productslist",
        queryString: `page=${page}&size=${size}`  /*s */
      }).toPromise(); //promise gelecek olan datayi beklememizi saglar. Task gibi

      /*gelen response nin basarili olup olmadigikontrolu */
      promiseData.then(d => successCallBack()) //try catch gibi. then true ise norm degilse catch. Tanimlanan d gelecek olan veriyle alakali bir param. 
        .catch((errorResponse: HttpErrorResponse) => erroCallBack(errorResponse.message));//error bir response olacak gicin http response kullanilmali.

      return await promiseData; //await promiseData degerini geri donen veriyi getirir.
    }
    catch (error) {
      if (erroCallBack) erroCallBack((error as HttpErrorResponse).message); // Call error callback if provided
      throw error; // Rethrow the error for further handling if needed
    }

  }

  async delete(id: string) {
    //bu kullanimin alternatifi assagida
    // this.httpClientService.delete({
    //   controller: "testcontroller/deleteproduct/",
    // },id).subscribe();
    console.log("productservice deki id = ",id);
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      // action kismi testcontroller/deleteproduct daki deleteproduct
      controller: "testcontroller",
      action: "deleteproduct"
    }, id);

    
    //await firstValueFrom(deleteObservable);
    try {
      const response = await firstValueFrom(deleteObservable);
      console.log("Delete successful", response);
    } catch (error) {
      console.error("Delete failed", error);
    }
    // .subscribe({
    //   next: (response) => { //next: Observable başarılı bir şekilde her yeni değer yaydığında çağrılır.
    //     console.log("Delete successful", response);
    //   },
    //   error: (error) => { // error: Observable bir hata yaydığında çağrılır.
    //     console.error("Delete failed", error);
    //   }
    // });

  }
  /* next ve error burada değişken değil, fonksiyon isimleridir. subscribe metoduna geçirilen nesne, üç isteğe bağlı özellik içerir:
   next, error ve complete. Bu özellikler, Observable'ın farklı durumlarını ele almak için kullanılır.*/



}
/* createProduct
 errorResponse icinde olan sey http response ile hatayi yakaladik ve bu hatayi ozel bir degisken (_error)
 atayarak cektik. Degiskenin turunu biz mauel olarak verdik. Bir nevi Dictionary olustruduk.
 key : hatanin alidnigi konum ve value de hatalar yani validasyondan gecemeyen mesajlardir.
 Bu sebeple value array olarak atanmistir. sonrada bi mesajlari foreach ile dondurduk.
 Fonksuyon erroCallBack adinda bir fonk parametresi aldi. fonksiyon gorevi goren parametre ve kendi icindede 
 aldigi bir parametre var. Sebebi error mesajlarini createProduct kullanilan yerde alertify ile kullaniciya aktarmak.

 Errorlar backendde uygulanan validasyonlarin sonucudur. 
*/