import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { category } from '../interfaces/category';
import { product } from '../interfaces/product';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  product?: product[];
  category?: category[];
  constructor(
    private homeService: BackServiceProviderService,
    private cartSercvice:CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //  product
    this.homeService.product();

    this.homeService.getPostEventListener().subscribe(
      (response) => {
        this.product = response.product;
        this.category = response.category;
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

    this.homeService.getAllcarts().subscribe(response=>{
      this.cartSercvice.cartCounter()
    })

  }
  onProduct(catename: any) {
    this.homeService.productbyId(catename);
  }
  isAddtoCart=false;
  addTocart(status:any,item: any) {
    this.isAddtoCart=status;
    let userid = this.auth.getUserId();
    if (userid) {
      let cart={
        customerId:userid,
        productId:item._id,
        cartStatus:this.isAddtoCart,
        quantity:1,
        p_price:item.p_price
      }
      console.log(cart);
      this.cartSercvice.cart(cart);
    } else {
      this.router.navigate(['/']);
    }
  }

}
