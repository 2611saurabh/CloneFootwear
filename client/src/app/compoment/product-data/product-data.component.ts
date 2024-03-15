import { Component,ViewChild } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrl: './product-data.component.css'
})
export class ProductDataComponent {
  searchText:string = '';

  setSearchText(value:string){

    this.searchText = value;

  }

  @ViewChild(ProductListComponent) productListCompoment:ProductListComponent


}
