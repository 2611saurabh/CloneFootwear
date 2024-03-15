import { Component,Input,inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetail } from '../compoment/Model/ProductDetail';
import { ProductDataService } from '../product-data.service';


@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrl: './seller-product-list.component.css'
})
export class SellerProductListComponent {

  data:any;
  selectedProduct: ProductDetail;
  dataService = inject(ProductDataService);
  productService = inject(ProductDataService);
  router = inject(Router);

  ngOnInit(): void {
    this.dataService.getProduct().subscribe(
      (res)=>{
        if(res.message==="products"){
          this.data=res.payload;
          
        }
      }
    )
  }

  goToSellerForm(){
    this.router.navigate(['/seller-form'])
  }

  
  selectedFilterRadioButton: string = 'all';

  onFilterChange(value: string){
    console.log("PArent Class on chage called");
    this.selectedFilterRadioButton = value;
  }

@Input()
  searchText:string = '';


}


