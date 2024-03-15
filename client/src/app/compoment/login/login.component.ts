import { HttpClient } from '@angular/common/http';
import { Component,OnInit ,inject} from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { FormBuilder, Validators } from "@angular/forms";
import { login } from '../Model/login';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{


fb: FormBuilder = inject(FormBuilder);
userService = inject(UserService);
router = inject(Router);
toast=inject(NgToastService)
userCredentialsError = {
  userCredErrStatus: false,
  userCredErrMsg: ""
};

userCredentials = this.fb.group({
  username: ["",Validators.required],
  password: ["",[Validators.required,Validators.minLength(6)]]
});

status = false;



    get username(){
      return this.userCredentials.get('username')
    }
  
    get password(){
      return this.userCredentials.get('password')
    }
  
  goToRegister(){
    this.router.navigate(['/signup'])
    }
  goToSeller(){
    this.router.navigate(['/seller']);
  }  

onSubmitUser() {
  // console.log(this.userCredentials.value);
  this.userService.userLogin(this.userCredentials.value).subscribe({
    next: (res) => {
      if (res.message === "login success") {
        this.status = true;
       if(this.userCredentialsError.userCredErrStatus){
        this.toast.success({
          detail:"Login Success",
          summary:"Successfull",
          duration:2000,
          position:'topCenter',
        })
       }

        //store token in local/session storage
        localStorage.setItem("token", res.token);
        //set user status & current user to service
        this.userService.setUserLoginStatus(true)
        this.userService.setCurrentUser(res.user)
        let name = res.user.username;
        let email = res.user.email;
        // console.log(res.user.username);
        // console.log(res.user.email);
        //sessionStorage.setItem('token',res.token)
        //navigate to user profile
        this.userService.loginusername.set(res.user.username)
        this.userService.loginuserId.set(res.user._id);
        this.router.navigate([`/product-data/${res.user.username}`]);
      } else {
        this.userCredentialsError = {
          userCredErrStatus: true,
          userCredErrMsg: res.message,
        };
      }
    },
    error: (error) => {
      console.log("err in user login", error);
    },
  });
}

}
