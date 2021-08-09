import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { Products } from './products';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ProductPost: Products[] = [];
  ProductId: string;
  ProductImage: any;
  isStatusSub: Subscription;
  userIsAutheticated: boolean;
  isProductsDetail: Subscription;
  totalPost = 0;
  postPerPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  currentPage = 1;
  mode: string = 'create';
  displayedColumns: string[] = [
    'Image',
    'Product name',
    'Product discription',
    'Category',
    'Product price',
    'Discount',
    'Stock Range',
    'status',
    'Action',
  ];
  constructor(
    private productService: ProductsService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
  
    this.productService.getProducts(this.postPerPage, 1);
    this.isProductsDetail = this.productService
      .getSubProducts()
      .subscribe((product: { products: []; postCount: number }) => {
        this.ProductPost = product.products;

        this.totalPost = product.postCount;
      });

    this.userIsAutheticated = this.authService.getAuth();
    this.isStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAutheticated) => {
        this.userIsAutheticated = isAutheticated;
      });
  }

  onChangePost(pageData: PageEvent) {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.productService.getProducts(this.postPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.isProductsDetail.unsubscribe();
    this.isStatusSub.unsubscribe();
  }
  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.getProducts(this.postPerPage, 1);
    });
  }
}
