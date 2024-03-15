
import { Component, Input, ChangeDetectorRef,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Model/Product';
import { ProductDetail } from '../../Model/ProductDetail';
import { ProductDataService } from '../../../product-data.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartService } from '../../../cart.service';



@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input()
  productListComp: ProductListComponent ;

  activateRoute = inject(ActivatedRoute)
  productService = inject(ProductDataService)

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private router: Router) {}

  product: ProductDetail;
  currentProduct:any

  ngOnInit():void {
    this.activateRoute.queryParams.subscribe((res)=>{
        this.productService.getCurrentProduct(res['id']).subscribe({
          next:(res)=>{
            console.log(res.payload)
            this.currentProduct = res.payload;
          }
        })
      }
    )
  }


  
}

