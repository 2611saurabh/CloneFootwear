import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './compoment/home/home.component';
import { LoginComponent } from './compoment/login/login.component';
import { CartComponent } from './compoment/product-data/cart/cart.component';
import { ProductDataComponent } from './compoment/product-data/product-data.component';
import { SignupComponent } from './compoment/signup/signup.component';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { SellerformComponent } from './sellerform/sellerform.component';
import { ProductDetailComponent } from './compoment/product-data/product-detail/product-detail.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { userGuardGuard } from './user-guard.guard';
import { sellerGuardGuard } from './seller-guard.guard';
import { ErrorpageComponent } from './compoment/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'cart',
    component: CartComponent,
    canActivate: [userGuardGuard,sellerGuardGuard]

  },
  {
    path: 'product-data/:username',
    component: ProductDataComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'product-data',
    component: ProductDataComponent
  },
  {
    path: 'seller-product-list',
    component: SellerProductListComponent
    
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
    canActivate:[sellerGuardGuard]
  },
  {
    path:'error',
    component:ErrorpageComponent
  },
  {
    path:'seller',
    component: SellerloginComponent
  },
  {
    path:'seller-form',
    component: SellerformComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'/error',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
