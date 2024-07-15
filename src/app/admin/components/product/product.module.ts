import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';  //Html kismindakiyapiyi kullanmak icin import edildi.
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeletesDirective } from 'src/app/directives/admin/deletes.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductComponent }
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DeleteDialogComponent,
    DeletesDirective

  ]
})
export class ProductModule { }
