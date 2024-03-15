import { Component,Input, OnInit,inject } from '@angular/core';
import {Product} from '../../Model/Product'
import { ProductDataService } from '../../../product-data.service';
import { ProductDetail } from '../../Model/ProductDetail';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  //we declare a variable selectedProduct of type Product where product is class type consist of datatype;
  // selectedProduct: Product;

  data:any;
  selectedProduct: ProductDetail;
  dataService = inject(ProductDataService);
  productService = inject(ProductDataService);

  ngOnInit(): void {
    this.dataService.getProduct().subscribe(
      (res)=>{
        if(res.message==="products"){
          this.data=res.payload;
          
        }
      }
    )
  }

  sortedHighToLow(){

    this.dataService.highToLow(this.data);
  }

  sortedLowToHigh(){
    this.dataService.lowToHigh(this.data);
  }
  
  selectedFilterRadioButton: string = 'all';

  onFilterChange(value: string){
    
    this.selectedFilterRadioButton = value;
  }

@Input()
  searchText:string = '';


}
