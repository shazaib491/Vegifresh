import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { product } from '../interfaces/product';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css'],
})
export class ProductsingleComponent implements OnInit {
quantity:any=1;
total:any;
  constructor(
    private route: ActivatedRoute,
    private homeService: BackServiceProviderService,
    private auth:AuthService,
    private router:Router,
    private cartService:CartService
  ) {}
  productId?: any;
  product?: any;
  ngOnInit(): void {
    this.homeService.product();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.productId = paramMap.get('id');
        this.homeService.getPostEventListener().subscribe((response) => {
          this.product = response.product?.filter(
            (p) => p._id === this.productId
          );
          console.log(this.product);

        });
      }
    });
  }


subTotal?:any=0;
addTotal(qty:any){
  var total=0;
  for(var i=0; i<this.product.length; i++){
    total+=this.quantity * this.product[i].p_price;
  }
  return total;
}

  addTocart(qty:any,item: any) {

    let userid = this.auth.getUserId();
    if (userid) {
      let cart={
        customerId:userid,
        productId:item._id,
        cartStatus:true,
        quantity:this.quantity,
        p_price:item.p_price
      }
      this.cartService.cart(cart);
      this.router.navigate(['/addtocart']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
