import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export const sellerGuardGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let userService = inject(UserService)
  let isSellerLogIn = userService.getSellerLoginStatus()
  if(!isSellerLogIn){
    router.navigate(['/seller-form'])
    return false;
  }
  else{

    return true;
  }
};
