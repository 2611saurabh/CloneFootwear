import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompomentComponent } from './compoment/compoment.component';
import { NavbarComponent } from './compoment/navbar/navbar.component';
import { LoginComponent } from './compoment/login/login.component';
import { HomeComponent } from './compoment/home/home.component';
import { SignupComponent } from './compoment/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDataComponent } from './compoment/product-data/product-data.component';
import { ProductDetailComponent } from './compoment/product-data/product-detail/product-detail.component';
import { ProductListComponent } from './compoment/product-data/product-list/product-list.component';
import { SearchComponent } from './compoment/product-data/search/search.component';
import { FilterComponent } from './compoment/product-data/product-list/filter/filter.component';
import { ProductComponent } from './compoment/product-data/product-list/product/product.component';
import { CartComponent } from './compoment/product-data/cart/cart.component';
import { HighlightDirective } from './compoment/CustomDirective/highlight.directive';
import { SellerloginComponent } from './sellerlogin/sellerlogin.component';
import { SellerformComponent } from './sellerform/sellerform.component';
import { NgToastModule } from 'ng-angular-popup';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { ErrorpageComponent } from './compoment/errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    CompomentComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProductDataComponent,
    ProductDetailComponent,
    ProductListComponent,
    SearchComponent,
    FilterComponent,
    ProductComponent,
    CartComponent,
    HighlightDirective,
    SellerloginComponent,
    SellerformComponent,
    SellerProductComponent,
    SellerProductListComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
