import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { CartsService } from './carts.service';
@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isCartSubstatus: Subscription;
  userIsAutheticated: boolean;
  isauthstatusSub: Subscription;
  totalPosts: number = 0;
  postPerPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage: number = 1;
  carts?: [];
  constructor(
    private authService: AuthServiceService,
    private cartService: CartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userIsAutheticated = this.authService.getAuth();
    this.isauthstatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAutheticated = isAuthenticated;
      });

    this.cartService.getCarts(this.postPerPage, 1);
    this.isCartSubstatus = this.cartService.iscartStatusSub.subscribe(
      (data: { cartdetail: []; postCount: number }) => {
        this.carts = data.cartdetail;
        this.totalPosts = data.postCount;

        console.log(this.carts);
      }
    );
  }

  onChangePost(pageData: PageEvent): void {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.cartService.getCarts(this.postPerPage, this.currentPage);
  }

  seeUser(id: any) {
    this.cartService.idSubStatus.next(id);
    this.router.navigate(['/users']);
  }
}
