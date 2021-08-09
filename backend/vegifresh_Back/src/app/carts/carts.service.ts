import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  iscartStatusSub = new Subject<{  cartdetail:[],postCount: number }>();
  idSubStatus=new BehaviorSubject(0);
  currentMessage = this.idSubStatus.asObservable();

  carts: [] = [];
  constructor(private http:HttpClient) { }
  getCarts(pageSize: number, currentPage: number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; cartPost: []; maxPosts:number,cartdetail:[] }>(
        `${environment.cartsUrls}/allcarts${querParams}`
      )
      .subscribe(
        (response) => {
          this.carts = response.cartdetail;
          this.iscartStatusSub.next({
            cartdetail: this.carts,
            postCount: response.maxPosts
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }


}
