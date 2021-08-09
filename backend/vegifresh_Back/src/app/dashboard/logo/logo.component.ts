import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { logo } from './../interface/logo';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  logoPost: logo[] = [];
  logoId: string;
  logoImage: any;
  isStatusSub: Subscription;
  userIsAutheticated: boolean;
  isLogoDetail: Subscription;
  totalPost = 0;
  postPerPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  currentPage = 1;
  displayedColumns: string[] = ['title', 'Image', 'Action'];
  constructor(
    private headerService: HeaderService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.headerService.getLogo(this.postPerPage, 1);
    this.isLogoDetail = this.headerService
      .logoAsEventListener()
      .subscribe((logoPost: { logo: []; postCount: number }) => {
        this.logoPost = logoPost.logo;
        this.totalPost = logoPost.postCount;
      });
      this.userIsAutheticated=this.authService.getAuth();
    this.isStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAutheticated) => {
        this.userIsAutheticated = isAutheticated;
      });
  }

  deleteLogo(id: any) {
    this.headerService.deleteLogo(id).subscribe(
      (data) => {
        console.log(data);

        this.headerService.getLogo(this.postPerPage, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChangePost(pageData: PageEvent) {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.headerService.getLogo(this.postPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.isLogoDetail.unsubscribe();
    this.isStatusSub.unsubscribe();
  }
}
