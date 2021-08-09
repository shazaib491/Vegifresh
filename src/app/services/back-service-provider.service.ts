import { HttpClient } from '@angular/common/http';
import { Injectable,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { category } from '../interfaces/category';
import { logo } from '../interfaces/logo';
import { product } from '../interfaces/product';
import { slider } from '../interfaces/slider';
import { payment } from '../interfaces/payment';
import { bucket } from '../interfaces/bucket';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class BackServiceProviderService {
  p?: product[];
  c?: category[];
  productSubjectStatusListener = new Subject<{
    product?: product[];
    category?: category[];
  }>();

  addToCart = new Subject();


  constructor(private http: HttpClient,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: object
    ) {

    }

    get nativeWindow(): any {
      if (isPlatformBrowser(this.platformId)) {
        return _window();
      }
    }

header(){
  return this.http.get<{ message: string; header: any[] }>(
    environment.headerUrl
  );
}


  logo() {
    return this.http.get<{ message: string; logo: logo[] }>(
      environment.logoUrl
    );
  }

  slider() {
    return this.http.get<{ message: string; slider: slider[] }>(
      environment.sliderUrl
    );
  }
  product() {
    return this.http
      .get<{
        message: string;
        product: product[];
        category: category[];
      }>(`${environment.productUrl}/product`)
      .subscribe(
        (response) => {
          this.p = response.product;
          this.c = response.category;
          this.productSubjectStatusListener.next({
            product: [...response.product],
            category: [...response.category],
          });
        },
        (error) => {}
      );
  }

  getPostEventListener() {
    return this.productSubjectStatusListener.asObservable();
  }


  addToCartEventListener() {
    return this.addToCart.asObservable();
  }

  productbyId(catname: string) {
    let product = this.p?.filter((p) => p.category === catname);
    this.productSubjectStatusListener.next({
      product: product,
      category: this.c,
    });
  }


  whishList(wishlist: object) {
    console.log(wishlist)
    this.http.post(`${environment.wishlistUrl}/addWishList`, wishlist).subscribe((response:{message?:string,cartCount?:any}) => {
      console.log(response);

      // if(response?.cartCount > 0){
      //   this.counterBehaviour.next({counter:response.cartCount})
      // }else{

      // }
    },error=>{
      console.log(error);
    });
  }

  getAllWishList(){
    return this.http.get<
    {
      message:string,
      wishlistdetail:[]
    }>(`${environment.wishlistUrl}/showWish`)
  }


  getAllcarts() {
    return this.http.get<{
      message: string;
      carts: [];
      product: product[];
      count: number;
      bucket:bucket[];
    }>(`${environment.cartUrl}/getAllcarts`);
  }

  payment(detail:object){
    this.http.post(`${environment.bankUrl}`,detail).subscribe((response:any)=>{
      this.router.navigate(['/checkout']);
    });
  }

  CustomerBankId(){
    return this.http.get<{message:string,bankDetail:payment}>(`${environment.bankUrl}/CustomerBankId`);
  }

  orderPayment(data:any){
    return this.http.post<{message:string,orders:object}>(`${environment.bankUrl}/orderPayment`,data);
  }

  verifyPayment(security:any){
    return this.http.post(`${environment.bankUrl}/verifyPayment`,security);
  }

}
