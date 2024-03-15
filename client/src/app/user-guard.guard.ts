import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {inject} from '@angular/core'

export const userGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  let router = inject(Router)
  let isLogIn = localStorage.getItem("token")
  if(!isLogIn){
    router.navigate(['/login'])
    return false;
  }
  return true;

  
};
