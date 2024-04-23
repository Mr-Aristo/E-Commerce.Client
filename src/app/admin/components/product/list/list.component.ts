import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Products } from 'src/app/contracts/product/list_product';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
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
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];

  dataSource: MatTableDataSource<List_Products>(ELEMENT_DATA);

  const  ELEMENT_DATA: List_Products[] = null;

  ngOnInit(): void { //component ilk yuklendiginde calisacak kisim

    this.showSpinner(SpinnerType.BallAtom);

    /*constructorda private olarak tanimlanmazsa burada gormuyor.*/
    this.productService.list(() => this.hideSpinner(SpinnerType.BallAtom));

  }

}

