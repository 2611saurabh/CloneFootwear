import { HttpClient } from '@angular/common/http';
import { Component, inject,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import {User} from '../Model/User'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent{


  duplicateUserStatus:boolean=false;
  fb: FormBuilder = inject(FormBuilder);
  userService=inject(UserService)
  router=inject(Router)
  toast = inject(NgToastService);

  user = this.fb.group({
    username: ['',Validators.required],
    password: ['',[Validators.required,Validators.minLength(6)]],
    email: ['',Validators.email]
    // dob: [''],
  });

  get username(){
    return this.user.get('username')
  }

  get password(){
    return this.user.get('password')
  }
  get email(){
    return this.user.get('email');
  }

  onSubmitUser() {
    let {username,password,email}=this.user.value;
    //console.log(username,password,email)
    let newUser =new User(username,password,email);
      this.userService.createUser(newUser).subscribe({
        next:(res)=>{
           //console.log(res);
          
          //navigate to login component
       if(this.duplicateUserStatus){
        this.toast.success({
          detail:"User Register",
          summary:"Successful",
          duration:4000,
          position:'topCenter'
        })
       }
          if(res.message==='User created'){
           this.router.navigate(['/login'])
          }else{
            this.duplicateUserStatus=true;
          }
        },
        error:(error)=>{
          console.log("err in user creation",error)
        }
  })
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}
