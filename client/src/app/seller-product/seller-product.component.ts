import { Component,inject,Input } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ProductDataService } from '../product-data.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrl: './seller-product.component.css'
})
export class SellerProductComponent {
  router = inject(Router);
  cartService = inject(CartService);
  productService = inject(ProductDataService)
  toast = inject(NgToastService);
  @Input()
  product:any;

  addToCart(product) {
    console.log(product)
    console.log(product._id)
    this.cartService.addProductToCart(product).subscribe({
      next:(res) =>{
        this.cartService.cart.push(res.payload);
      }
    });
   
    this.router.navigate(['/cart'])
  }


 

  onDelete(id:string):void{
    this.productService.deleteProduct(id).subscribe(
      (res) =>{
        this.toast.error({
          detail:"Shoes Deleted",
          summary:"Successfull",
          duration:4000,
          position:'topCenter',
        })
        this.router.navigate(['/seller-form'])
      }
    )
  }

  

}
