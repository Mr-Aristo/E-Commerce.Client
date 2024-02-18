CustomerModule icinde import edilen RouterModule route islemleri icin gereklidir.

{ path: 'customer', component: CustomerComponent}
Bu kodun anlami customer diye bir istek geldiginde CustomerComponenti handle edecek

Diger componentlerde de ayni mantigi kullaniyoruz. 

forChild olan rotalarimizi app.route.module icinde root rota haline getirdik. 

path:'' ksimi bos gecildi cunki simdilik herbirinden birertane var. Eger fazlalasirsa alt pathlarda girilir.
ust path app.route.module de tanimlandi.