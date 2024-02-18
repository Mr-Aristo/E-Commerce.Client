appRoutingMopdlu icinde admin ve Ui in child rotalari tanimlandi. 

Multiple  yada n tane layout oldugunda rota islemi layoutlardan baslanmali sonra diger rotalar ve en son 
ana layout tanimlanmali.
Kafa karisikligini engellemek amaciyla boyle bir siralama uygulanmali. 

{Path:"", component:...} path kismi rotadir, ytani wwww.site.com/home/... kismindaki yerden gelen istekdir. 


  {path:"admin",component:LayoutComponent,              //Admin kismina ait Layout.Admin kismi altinda calisacak comp. lar children olarak bildirilir. 
  children:  
  [
    {path:"customers",loadChildren:()=>import("./admin/components/customer/customer.module").then
    (module=> module.CustomerModule)},

  ]
 }

 burda bir path belirledik. admin/customers gibi bir istek geldiginde customers modulune bagli olan componentleri ototmatikman cagirmis olduk. 
 Bunu adimin comoponents dosyasi icindeki herbir modul icin app.route.module de tanimalamamiz gerekiyor. 