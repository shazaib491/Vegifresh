import { Component, OnInit } from '@angular/core';
import { bucket } from '../interfaces/bucket';
import { product } from '../interfaces/product';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
})
export class AddtocartComponent implements OnInit {
  constructor(
    private homeService: BackServiceProviderService,
    private cartService: CartService
  ) {}
  cartProduct?: product[];
  qty: any = 1;
  bucket?: bucket[];
  total: number = 0;

  ngOnInit(): void {
    this.homeService.getAllcarts().subscribe(
      (response: {
        bucket: bucket[];
      }) => {
        this.bucket = response?.bucket;
      },
      (error) => {}
    );
  }

  grandTotal():number {
    var total = 0;

    this.bucket?.forEach((product) => {
      total += product.quantity * product.p_price;
    });

    return total;
  }

  discountTotal() {
    let discount = 0;
    this.bucket?.forEach((product) => {
      discount += product.productdetail.discount
    });

    return discount;
  }

  cartTotal() {
    this.total = 0;
    this.total += this.grandTotal() - (this.discountTotal() * 100) / 100;

    return this.total + 30;
  }

  removeTocart(item: any) {
    this.bucket?.splice(
      this.bucket.findIndex((e) => e.customerId === item.customerId),
      1
    );

    let cart = {
      customerId: item.customerId,
      productId: item.productId,
      cartStatus: item.status,
      quantity: item.quantity,
      p_price: item.p_price,
    };



    this.cartService.cart(cart);
  }

  checkout() {
    let cartId: any = [];
    let customerId: any;

    this.bucket?.forEach((crt) => {
      cartId.push(crt._id);
      customerId = crt.customerId;
    });





    this.cartService.updationQtyArr(this.bucket).subscribe((Post:any)=>{
      console.log(Post)
    })

    const payment = {
      cartId: cartId,
      customerId: customerId,
      totalamount: this.cartTotal() ,
      discount: this.discountTotal(),
    };

    this.homeService.payment(payment);
  }
}
