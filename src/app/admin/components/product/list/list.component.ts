import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Products } from 'src/app/contracts/product/list_product';
import { AlertifyService, MessageType, Positions } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'app-list',
  // standalone: true,
  // imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private alertfy: AlertifyService, private productService: ProductService) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'creationDate', 'updatedDate'];

  dataSource: MatTableDataSource<List_Products> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async ngOnInit() { //component ilk yuklendiginde calisacak kisim

    this.showSpinner(SpinnerType.BallAtom);

    /*constructorda private olarak tanimlanmazsa burada gormuyor.*/
    /*list() promise olarak dondugu icin await ile karsilanmasi gerekli */
    /*await promise i bekler ve onu dondurur promise islem basarili veya basarisiz sonucu dondurur*/
   const allProducts: List_Products[] = await this.productService.list(() => this.hideSpinner(SpinnerType.BallAtom), errorMessage =>
      this.alertfy.message(errorMessage, {
        messageType: MessageType.Error,
        position: Positions.TopRight
      }));
    
    this.dataSource = new MatTableDataSource<List_Products>(allProducts);
    
  }

}

