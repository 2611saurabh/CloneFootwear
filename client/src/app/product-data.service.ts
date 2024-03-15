import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  


  httpClient = inject(HttpClient);
 

  // Method to sort the shoes price
  highToLow(products: any): any {
     products.sort((a:any, b:any) => {

      if(a.price < b.price){
        console.log("Function run")

        return -1;

      }
      if(a.price > b.price){
        console.log("function 2 run")
        return 1;
      }
      return 0;
    }
    
    );
    return products;
  }

  lowToHigh(products: any): any {
    products.sort((a:any, b:any) => {

      if(a.price < b.price){
       

        return 1;

      }
      if(a.price > b.price){
        
        return -1;
      }
      return 0;
    }
    
    );
    return products;
  }


  deleteProduct(id:string): Observable<any>{
    return this.httpClient.delete(`http://localhost:4000/product-api/product/${id}`)
  }

  getProduct(): Observable<any>{

    return this.httpClient.get('http://localhost:4000/product-api/product');
  }
  getCurrentProduct(id:any):Observable<any>{
    return this.httpClient.get('http://localhost:4000/product-api/product/'+id);
  }

  createProduct(newProduct): Observable<any>{
    return this.httpClient.post('http://localhost:4000/product-api/product',newProduct)
  }

  
}
