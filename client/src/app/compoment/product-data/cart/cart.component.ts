
import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../cart.service';
import { UserService } from '../../../user.service';
import { ProductDataService } from '../../../product-data.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // cart?:any;

  userservice = inject(UserService);
  cartService = inject(CartService)
  productService = inject(ProductDataService)
  toast = inject(NgToastService)
  router = inject(Router)
  cartItem:any[] = []
  userId:any;
 

  // constructor(private cartService: CartService) {
  //   // this.cart = this.cartService.getCart();
  // }

  ngOnInit():void{
    this.cartService.getCartData().subscribe({
      next:(res) =>{
        // console.log(res.body)
        // console.log("Good Morning");
        this.cartItem = res.payload.cart;
      }
    })
  }


  removeItem(id){
    this.cartService.removeItemFromCart(id).subscribe({
      next:(res) =>{
        this.toast.error({
          detail:"Deleted From Cart",
          summary:"Successfull",
          duration:4000,
          position:'topCenter',
        })
        this.router.navigate(['/product-data'])
      },
      error:(err)=>[
        console.log("error")
      ]
    })
  }

  

 

  totalPrice(): number {
    let total = 0;
    for (const product of this.cartItem) {
      total += product.price;
    }
    return total;
  }
  discountPrice(){
    let price = this.totalPrice()
    let discount = price * 0.05;
    let total = price - discount;
    console.log(this.totalPrice() - total)
    return this.totalPrice() - total;

  }
  checkOut(){
    this.toast.success({
              detail:"Thank You For Shoping",
              summary:"Successfull",
              duration:3000,
              position:'topCenter',
            })

  }


  goToProduct(){
    this.router.navigate(['/product-data'])
  }
  deleteProduct(index: number) {
    this.cartService.deleteFromCart(index);
  }

  // getCart(username){
  //   this.userservice.getCartData(username)
  // }

}
