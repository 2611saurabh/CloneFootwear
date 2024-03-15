import { Component,inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder,Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-sellerlogin',
  templateUrl: './sellerlogin.component.html',
  styleUrl: './sellerlogin.component.css'
})
export class SellerloginComponent {

  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  toast = inject(NgToastService);
  
  sellerCredentialsError = {
    sellerCredErrStatus:false,
    sellerCredErrMsg: "",
  };

  sellerStatus = signal("")

  sellerCredentials = this.fb.group({
    username: ["",Validators.required],
    password: ["",Validators.required]
  });

  get username(){
    return this.sellerCredentials.get('username')
  }

  get password(){
    return this.sellerCredentials.get('password')
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  onSubmitSeller() {
    this.userService.sellerLogin(this.sellerCredentials.value).subscribe({
      next: (res) =>{
        if(res.message === "login success"){
          
          this.toast.success({
            detail:"LogIn Seller",
            summary:"Successful",
            duration:4000,
            position:'topCenter'
          })
          localStorage.setItem("token",res.token);
          this.userService.setSellerLoginStatus(true);
          this.userService.setCurrentSeller(res.seller)
          this.router.navigate(['/seller-form'])
        }
        else{
          this.sellerCredentialsError = {
            sellerCredErrStatus: true,
            sellerCredErrMsg: res.message
          };
        }
      },
      error: (error) =>{
        console.log("err in seller Login",error);
      }
    })
  }
}
