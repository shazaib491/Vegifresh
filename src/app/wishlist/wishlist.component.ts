import { Component, OnInit } from '@angular/core';
import { wishlist } from '../interfaces/wishlist';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
wishArray:wishlist[]=[];
  constructor(private homeService: BackServiceProviderService,
    private auth:AuthService,
    private router:Router,
    private cartService:CartService

    ) { }

  ngOnInit(): void {
    this.homeService.getAllWishList().subscribe((response:{message:string,wishlistdetail:[]})=>{
      this.wishArray=response.wishlistdetail;
      this.homeService.getAllcarts().subscribe(items=>{
        this.wishArray?.forEach((el:any,i)=>{
           items.carts.some((e:any)=>{
            if(e.productId==el.productId){
              return el.productdetail.status=true;
            }else{
              return false;
            }
          })
        })
      })
    })
  }

  isAdd:boolean=false;
  addTocart(item:any){
    let userid = this.auth.getUserId();
    this.isAdd=item.productdetail.status;
    if (userid) {
      let cart={
        customerId:userid,
        productId:item.productId,
        cartStatus:this.isAdd,
        quantity:1,
        p_price:item.totalPrice
      }
      let data=this.cartService.cart(cart);
    }
    else{

      this.router.navigate(['/']);

    }
  }


  removeTocart(item: any) {
    let cart = {
      customerId: item.customerId,
      productId: item.productId,
      cartStatus: item.productdetail.status,
      quantity: item.quantity,
      p_price: item.totalPrice,
    };
    this.wishArray=this.wishArray.filter(e=>{
      return e.productId!=cart.productId
    })
    this.homeService.whishList(cart);
  }

}
