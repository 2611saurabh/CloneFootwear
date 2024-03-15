import { Component,inject } from '@angular/core';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ProductDetail } from '../compoment/Model/ProductDetail';
import { Router } from '@angular/router';
import { ProductDataService } from '../product-data.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-sellerform',
  templateUrl: './sellerform.component.html',
  styleUrl: './sellerform.component.css'
})
export class SellerformComponent {


  duplicateProductStatus:boolean = false;
  productDataService = inject(ProductDataService);
  userService = inject(UserService)
  router = inject(Router)
  toast = inject(NgToastService)
  fb: FormBuilder = inject(FormBuilder);

  Product = this.fb.group({
    id:[],
    name:['',Validators.required],
    description:[''],
    brand:['',Validators.required],
    gender:['',Validators.required],
    category:['',Validators.required],
    size:['',Validators.required],
    color:['',Validators.required],
    price:[,Validators.required],
    discountPrice:[''],
    is_in_inventory:[],
    items_left:[],
    imageURL:['',Validators.required],
    slug:['']

  })

  get name(){
    return this.Product.get('name')
  }

  get brand(){
    return this.Product.get('brand')
  }

  get gender(){
    return this.Product.get('gender')
  }

  get category(){
    return this.Product.get('category')
  }

  get color(){
    return this.Product.get('color')
  }

  get size(){
    return this.Product.get('size')
  }

  get price(){
    return this.Product.get('price')
  }

  get image(){
    return this.Product.get('imageURL')
  }

  onSubmitProduct(){
    
    let {id,name,description,brand,gender,category,size,color,price,discountPrice,is_in_inventory,items_left,imageURL,slug} = this.Product.value;

    let newProduct = new ProductDetail(id,name,description,brand,gender,category,size,color,price,discountPrice,is_in_inventory,items_left,imageURL,slug);

    this.productDataService.createProduct(newProduct).subscribe({
      next:(res) =>{
        
        if(res.message === "Product created"){
          this.toast.success({
            detail:"Shoes Data Saved",
            summary:"Successfull",
            duration:2000,
            position:'topCenter',
          })
          this.router.navigate(['/product-data'])
        }
        else{
          this.duplicateProductStatus = true;
          this.toast.error({
            detail:"Shoes Already Existed",
            summary:"Not Saved",
            duration:3000,
            position:"topCenter"
          })
        }
      },
      error:(error) =>{
        console.log("error in product creation",error)
      }
    })
  }

  goToProduct(){
    this.router.navigate(['/seller-product-list'])
  }

}
