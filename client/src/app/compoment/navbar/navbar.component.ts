import { Component,inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  router = inject(Router);
  status:any;
  UserServiceObj = inject(UserService)
  toast = inject(NgToastService)
  track:boolean = false

  constructor(){
    if(localStorage.getItem('token')){
      this.status=this.UserServiceObj.setUserLoginStatus(true);
    }
  }

  ngOnInit() {
    this.UserServiceObj.getUserLoginStatus().subscribe({
      next: (userLoginStatus) => this.status =userLoginStatus
    });
  }

  toggleNavbar(){
    this.track = !this.track;
    const navbarNav = document.getElementById('navbarNavDropdown');
    if(this.track){
      navbarNav.classList.add('show');
    }
    else{
      navbarNav.classList.remove('show');
    }
  }



  goToHome(){
    this.router.navigate(['/home'])
  }

  goToMens(){
    this.router.navigate(['/home'])
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
   goToSignup(){
    this.router.navigate(['/signup'])
  }

  goToProductDetail(){
    // console.log("cart adding")
    this.router.navigate(['/product-data'])
  }


  goToCart(){
    this.router.navigate(['/cart']);
  }

  logout() {
    // Implement your logout logic here
    // Clear token, reset user data, etc.
    // Example:
    localStorage.removeItem('token'); // Remove the authentication token
    this.UserServiceObj.setUserLoginStatus(false); // Set user login status to false
    this.toast.success({
      detail:"Logged Out",
      summary:"",
      duration:4000,
      position:'topCenter',
    })
    this.router.navigate(['/login']); // Navigate to login page
  }
}
