

// cart.service.ts
import { Injectable,inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = [];


  httpClient = inject(HttpClient)
  userService = inject(UserService);

  username = this.userService.loginusername


  

  getCart() {
    return this.cart;
  }
  deleteFromCart(index: number) {
    this.cart.splice(index, 1);
  } 

  addProductToCart(product:any):Observable<any>{

    return this.httpClient.put(`http://localhost:4000/user-api/user/${this.userService.loginusername()}`,product);
  }

  removeItemFromCart(id:number):Observable<any>{
    return this.httpClient.post(`http://localhost:4000/user-api/user/${this.username()}`,{abc:id})
  }


  //get Cart data
  getCartData(): Observable<any>{
   
    return this.httpClient.get(`http://localhost:4000/user-api/user/${this.userService.loginusername()}`)
  }


  //fetch cart Data 
  fetchCartData(userId:string): Observable<any>{
    console.log(this.userService.loginuserId());
    console.log(this.userService.loginusername());
    userId = this.userService.loginuserId();
    return this.httpClient.get(`http://localhost:4000/user-api/${userId}/cart`)
  }



  //deleteing Item from db
  // Delete a product from the cart based on its unique ID
  deleteProductFromCart(username: string, productId: string): Observable<any> {
    
    return this.httpClient.post(`http://localhost:4000/user-api/user/${username}`, { _id: productId });
  }



  
}
