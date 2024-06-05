import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Products } from 'src/app/contracts/product/list_product';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

//jquery request
declare var $ : any 

@Component({
  selector: 'app-list',
  // standalone: true,
  // imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private alertfy: AlertifyService,
    private productService: ProductService,
    //private changeDetectorRefs: ChangeDetectorRef
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'creationDate', 'updatedDate', 'update', 'delete'];

  //dataSource: MatTableDataSource<List_Products> = null;
  dataSource: MatTableDataSource<List_Products> = new MatTableDataSource<List_Products>();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom);

    try {

      /*constructorda private olarak tanimlanmazsa burada gormuyor.*/
      /*list() promise olarak dondugu icin await ile karsilanmasi gerekli */
      /*await promise i bekler ve onu dondurur promise islem basarili veya basarisiz sonucu dondurur*/
      /* paginator da sayfa varsa getir yoksa 0 degerini ata kondusyonunu ? : ile tanimladik.  */
      const allProducts: { totalCount: number, products: List_Products[] } = await this.productService.list
        (this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
          () => this.hideSpinner(SpinnerType.BallAtom),
          errorMessage => this.alertfy.message(errorMessage, {
            messageType: MessageType.Error,
            position: Positions.TopRight
          })
        );

      //console.log("Products fetched:", allProducts.products); 
      //console.log("Products fetched:", allProducts.totalCount); 
      this.dataSource = new MatTableDataSource<List_Products>(allProducts.products);
      //console.log("Data source:", this.dataSource.data);

      /*Bu tanimlama olmadan paginator calismaz*/
      this.paginator.length = allProducts.totalCount;
      // this.changeDetectorRefs.detectChanges(); // Trigger change detection manually

    }
    catch (error) {
      console.error("Error fetching products:", error); // Error log
    }
  }

  /*bu fonksiyon html kisminda commentde aciklandi. */
  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() { //component ilk yuklendiginde calisacak kisim
    await this.getProducts();
    this.dataSource.paginator = this.paginator;
  }

  async delete(id, event) {
    //alert(id);
    //Budaki amacimiz satiri listeden kaldirmak consolelog da iki parent geldi tr yani row u silmek icin
    const img: HTMLImageElement = event.srcElement;
    //console.log(img.parentElement.parentElement);
    $(img.parentElement.parentElement).fadeOut(2000); //jquery ile row u  animasyon ile siliyoruz.
    

    try {
      // alert(id); // Eğer ID'yi kontrol etmek isterseniz bu satırı açabilirsiniz
      const response = await this.productService.delete(id);
      
      console.log("Delete successful", response);
    } catch (error) {
      console.error("Delete failed", error);
    }
    await this.getProducts();
  }
}

