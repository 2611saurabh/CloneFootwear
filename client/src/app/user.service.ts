import { Injectable,inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './compoment/Model/User';
import { Seller } from './compoment/Model/seller';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  httpClient = inject(HttpClient);

  userLoginStatus=new BehaviorSubject<boolean>(false)
  currentUser=new BehaviorSubject<User>({
    username:'',
    password:'',
    email:'',
    // dob:''
  })

  //seller

  sellerLoginStatus=new BehaviorSubject<boolean>(false)
  currentSeller=new BehaviorSubject<Seller>({
    username:'',
    password:''
   // email:'',
    // dob:''
  })


  //signal
  userloginType = signal('')
  Status = signal(false)
  loginusername = signal('')
  loginuserId = signal('');


  //sellerLoginStatus
  setSellerLoginStatus(value:boolean){
    this.sellerLoginStatus.next(value)
  }

  setCurrentSeller(seller:Seller){
    this.currentSeller.next(seller);
  }

  getSellerLoginStatus(){
    return this.sellerLoginStatus.asObservable()
  }

  getCurrentSeller(){
    return this.currentSeller.asObservable();
  }
 
  sellerLogin(sellerCredObj): Observable<any> {
    // console.log(userCredObj);
    return this.httpClient.post(
      'http://localhost:4000/seller-api/login',sellerCredObj
    );
  }

  

  // User
  setUserLoginStatus(value:boolean){
    this.userLoginStatus.next(value)
  }
  setCurrentUser(user:User){
    this.currentUser.next(user);
  }

  getUserLoginStatus(){
    return this.userLoginStatus.asObservable()
  }

  getCurrentUser(){
    return this.currentUser.asObservable();
  }


  //create user(User registration)
  createUser(newUser): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/user', newUser);
  }



  //user login service method
  userLogin(userCredObj): Observable<any> {
    
    return this.httpClient.post(
      'http://localhost:4000/user-api/login',userCredObj
    );
  }

  //get user by username
  getUserByUsername(username): Observable<any> {
    return this.httpClient.get(
      `http://localhost:4000/users?username=${username}`
    );
  }


  //get users sensitve data
  getProtectedData(){
   return this.httpClient.get('http://localhost:4000/user-api/user-sensitive-data')
  }


  //user logout
  userLogout(){
    //reset current user
    this.setUserLoginStatus(false)
    //reset login status
    this.setCurrentUser({
      username:'',
      password:'',
      email:'',
      // dob:''
    })
    //remove token from localstorage
    localStorage.removeItem('token')
  }
}
