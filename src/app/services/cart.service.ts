import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { bucket } from '../interfaces/bucket';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public totalCart = new BehaviorSubject<{ counter: any }>({
    counter: 0,
  });

  totalCartEventListener() {
    return this.totalCart.asObservable();
  }

  cart(cart: object) {
    this.http.post(`${environment.cartUrl}/addTocart`, cart).subscribe(
      (response: { message?: string; cartCount?: any }) => {
        this.totalCart.next({ counter: response.cartCount });
        this.cartCounter();
      },
      (error) => {}
    );
  }

  cartCounter() {
    this.http
      .get<{ message: string; count: number }>(
        `${environment.cartUrl}/totalCart`
      )
      .subscribe((response: { message: string; count: number }) => {
        this.totalCart.next({ counter: response.count });
      });
  }

  updationQtyArr(bucket: bucket[] | undefined) {

  return   this.http.post(`${environment.cartUrl}/updationQtyArr`, bucket);
  }
}
