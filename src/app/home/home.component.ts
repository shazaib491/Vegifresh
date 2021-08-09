import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { category } from '../interfaces/category';
import { product } from '../interfaces/product';
import { wishlist } from '../interfaces/wishlist';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { CartService } from '../services/cart.service';
import { slider } from './../interfaces/slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sliderSubsribtion?: Subscription;
  slider?: slider[];
  product?: product[];
  constructor(
    private homeService: BackServiceProviderService,
    private cartService: CartService,
    private auth:AuthService,
    private router:Router
    ) {}

  ngOnInit(): void {
    //  fetching Slider info
    this.homeService.slider().subscribe(
      (response: { message: string; slider:slider[] }) => {
        this.slider = response.slider;
      },
      (error) => {
        console.log(error);
      }
    );
    //  slider
    
      this.homeService.product();
    // fetching  product info
    this.homeService.getPostEventListener().subscribe(
      (response) => {
        this.product = response.product;
        this.homeService.getAllcarts().subscribe(items=>{
          this.product?.forEach((el:any,i)=>{
             items.carts.some((e:any)=>{
              if(e.productId==el._id){
                return el.status=true;
              }else{
                return false;
              }
            })
          })
        })




        this.homeService.getAllWishList().subscribe((items:any)=>{
          this.product?.forEach((el:any,i)=>{
             items.wishlistdetail.some((e:any)=>{
              if(e.productId==el._id){
                return el.wishlistStatus=true;
              }else{
                return false;
              }
            })
          })
        })
      },
      (error) => {
        console.log(error);
      }
    );
    //  product
  }









isAdd:boolean=false;
  addTocart(status:any,item:any){
    let userid = this.auth.getUserId();
    this.isAdd=status;
    if (userid) {;
      let cart={
        customerId:userid,
        productId:item._id,
        cartStatus:this.isAdd,
        quantity:1,
        p_price:item.p_price
      }
      let data=this.cartService.cart(cart);
    }
    else{
      this.router.navigate(['/']);
    }
  }



  isWish:boolean=false;
  addToWhishList(status:boolean,item:any){
    let userid = this.auth.getUserId();
    this.isWish=status;

    if (userid) {
      let wish={
        customerId:userid,
        productId:item._id,
        wishlist:this.isWish,
        quantity:1,
        p_price:item.p_price
      }
      let data=this.homeService.whishList(wish);
    }
    else{

      this.router.navigate(['/']);

    }
  }
}
