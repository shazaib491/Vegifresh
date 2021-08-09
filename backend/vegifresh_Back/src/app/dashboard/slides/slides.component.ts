import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Slides } from '../interface/slides';
import { SlidesService } from '../slides.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css'],
})
export class SlidesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private slidesServices: SlidesService,
    private authService: AuthServiceService
  ) {}
  slidesPost: Slides[] = [];
  isSlidesSubStatus: Subscription;
  userIsAutheticated: boolean;
  isauthstatusSub: Subscription;
  totalPosts: number = 0;
  postPerPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage: number = 1;
  displayedColumns: string[] = ['title', 'subtitle', 'Image', 'Action'];

  ngOnInit(): void {
    this.slidesServices.getSlide(this.postPerPage, 1);

    this.isSlidesSubStatus = this.slidesServices
      .getSubSlides()
      .subscribe((data: { slides: Slides[]; postCount: number }) => {
        this.slidesPost = data.slides;
        this.totalPosts = data.postCount;
      });
    this.userIsAutheticated = this.authService.getAuth();
    this.isauthstatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAutheticated = isAuthenticated;
      });
  }
  onChangePost(pageData: PageEvent) {
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.slidesServices.getSlide(this.postPerPage, this.currentPage);
  }

  deleteSlide(id: string) {
    this.slidesServices.deleteSlides(id).subscribe((data) => {
      this.slidesServices.getSlide(this.postPerPage, 1);
    });
  }

  ngOnDestroy() {
    this.isSlidesSubStatus.unsubscribe();
    this.isauthstatusSub.unsubscribe();
  }
}
