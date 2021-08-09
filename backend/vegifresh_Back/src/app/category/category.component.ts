import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isCategorySubstatus: Subscription;
  userIsAutheticated: boolean;
  isauthstatusSub: Subscription;
  mode = 'insert';
  category: [];
  totalPosts: number = 0;
  postPerPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage: number = 1;
  constructor(
    private catService: CategoryService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userIsAutheticated = this.authService.getAuth();
    this.isauthstatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAutheticated = isAuthenticated;
      });
    this.catService.getCategrory(this.postPerPage, 1);
    this.isCategorySubstatus = this.catService.iscategoryStatusSub.subscribe(
      (data: { category: []; postCount: number }) => {
        this.category = data.category;
        this.totalPosts = data.postCount;

      }
    );
  }

  onChangePost(pageData: PageEvent): void {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.catService.getCategrory(this.postPerPage, this.currentPage);
  }

  deleteCategory(id: string) {
    this.catService.deleteCategory(id).subscribe((data) => {
      this.catService.getCategrory(this.postPerPage, 1);
    });
  }
}
