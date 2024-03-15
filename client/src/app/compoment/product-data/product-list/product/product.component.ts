import { Component,Input,inject,OnInit } from '@angular/core';
import {Product} from '../../../Model/Product'
import { Router } from '@angular/router';
import { CartService } from '../../../../cart.service';
import { NgToastService } from 'ng-angular-popup'; 


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  router = inject(Router);
  cartService = inject(CartService);
  @Input()
  product:any;
  id:any
  toast = inject(NgToastService)

  ngOnInit():void{
    this.id = {'id':this.product.id}
  }

  addToCart(product) {
    this.cartService.addProductToCart(product).subscribe({
      next:(res) =>{
        this.toast.success({
          detail:"Shoes Added to Cart",
          summary:"Successfull",
          duration:2000,
          position:"bottomRight"
        })
        this.cartService.cart.push(res.payload);
      }
    });
    this.router.navigate(['/cart'])
  }

  

  toCart(){
    this.router.navigate(['/cart'])
  }

  goToDetail(){
    this.router.navigate(['/product-detail'])
  }
   

}
