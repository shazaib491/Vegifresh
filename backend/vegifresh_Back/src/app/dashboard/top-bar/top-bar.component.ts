import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

export interface topBarElement {
  _id: string;
  email: string;
  mobile: string;
}
let ELEMENT_DATA: topBarElement[] = [];

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form: FormGroup;
  private postId: any;
  public topheader: topBarElement;
  totalPost = 0;
  postPerPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  currentPage = 1;

  isStatusSub: Subscription;
  userIsAutheticated: boolean;
  isTopDetail: Subscription;
  constructor(
    private headerService: HeaderService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  topBarData: topBarElement[];
  ngOnInit(): void {
    this.headerService.getTopBar(this.postPerPage, 1);
    this.isTopDetail = this.headerService
      .getTopbarEventListener()
      .subscribe((data: { topbarData: topBarElement[]; postCount: number }) => {
        this.topBarData = data.topbarData;
        this.totalPost = data.postCount;
      });
    this.userIsAutheticated = this.authService.getAuth();
    this.isStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAutheticated = isAuthenticated;
      });
  }

  displayedColumns: string[] = ['email', 'mobile', 'action'];

  deletebar(id: any) {
    this.headerService.deleteTopBar(id).subscribe(() => {
      this.headerService.getTopBar(this.postPerPage, 1);
    });
  }

  onChangePost(pageData: PageEvent) {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.headerService.getTopBar(this.postPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.isTopDetail.unsubscribe();
    this.isStatusSub.unsubscribe();
  }
}
