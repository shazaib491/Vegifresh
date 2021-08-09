import { Component, OnInit,Input } from '@angular/core';
import { product } from '../interfaces/product';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-child',
  templateUrl: './shop-child.component.html',
  styleUrls: ['./shop-child.component.css']
})
export class ShopChildComponent implements OnInit {
  @Input() item?: any;
  constructor(private homeService: BackServiceProviderService,
    private auth: AuthService,
    private router: Router) { }
    counter?: any;

  ngOnInit(): void {
   this.homeService.getAllcarts().subscribe(response=>{
    //  this.homeService.counterBehaviour.next({counter:response.count})
   })
  }
  isAddtoCart=false;
  addTocart(item: any) {
    console.log(item);

    this.isAddtoCart=!this.isAddtoCart
    let userid = this.auth.getUserId();
    if (userid) {
      // this.counter++;
      let cart={
        customerId:userid,
        productId:item._id,
        cartStatus:this.isAddtoCart,
        quantity:1,
        p_price:item.p_price
      }
      console.log(cart);

      // this.homeService.cart(cart);
      // this.homeService.cartCounter(this.counter, item.id);
    } else {
      this.router.navigate(['/']);
    }
  }
}
