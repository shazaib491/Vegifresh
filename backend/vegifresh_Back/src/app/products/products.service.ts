import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from './products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  isProductsStatusSub = new Subject<{
    products: Products[];
    postCount: number;
  }>();

  products: Products[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  addProducts(data: any) {
    const productDetail = new FormData();
    productDetail.append('image', data.image);
    productDetail.append('p_name', data.p_name);
    productDetail.append('p_disc', data.p_disc);
    productDetail.append('category', data.category);
    productDetail.append('p_price', data.p_price);
    productDetail.append('discount', data.discount);
    productDetail.append('stock', data.stock);
    productDetail.append('stock_range', data.stock_range);
    this.http
      .post(`${environment.productsUrls}/addProduct`, productDetail)
      .subscribe(
        (success) => {
          this.router.navigate(['/products']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getSubProducts() {
    return this.isProductsStatusSub.asObservable();
  }

  getProducts(pageSize: number, currentPage: number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;

    this.http
      .get<{ message: string; products: Products[]; maxPosts }>(
        `${environment.productsUrls}/getProducts${querParams}`
      )
      .subscribe(
        (product) => {
          this.products = product.products;
          console.log(this.products);

          this.isProductsStatusSub.next({
            products: this.products,
            postCount: product.maxPosts,
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getProductById(id: string) {
    return this.http.get(`${environment.productsUrls}/getProductById/${id}`);
  }

  getCategory() {
    return this.http.get(`${environment.categoryUrls}/allcategory`);
  }

  updateProductById(id: string, data: any) {
    let productDetail;
    if (typeof data.image == 'object') {
      productDetail = new FormData();
      productDetail.append('image', data.image);
      productDetail.append('p_name', data.p_name);
      productDetail.append('p_disc', data.p_disc);
      productDetail.append('category', data.category);
      productDetail.append('p_price', data.p_price);
      productDetail.append('discount', data.discount);
      productDetail.append('stock', data.stock);
      productDetail.append('stock_range', data.stock_range);
    } else {
      productDetail = {
        image: data.image,
        p_name: data.p_name,
        p_disc: data.p_disc,
        category: data.category,
        p_price: data.p_price,
        discount: data.discount,
        stock: data.stock,
        stock_range: data.stock_range,
      };
    }
    this.http
      .put(`${environment.productsUrls}/updateProductById/${id}`, productDetail)
      .subscribe((data) => {
        this.router.navigate(['/products']);
      });
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.productsUrls}/deleteProduct/${id}`);
  }
}
