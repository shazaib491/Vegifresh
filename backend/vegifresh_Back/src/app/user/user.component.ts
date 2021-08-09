import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { CartsService } from '../carts/carts.service';
import { UsersService } from './Services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isUserSubstatus: Subscription;
  userIsAutheticated: boolean;
  isauthstatusSub: Subscription;
  user?: any[];
  totalPosts: number = 0;
  postPerPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage: number = 1;
  public isLoading = false;
  id?: any = '423423423';
  constructor(
    private userService: UsersService,
    private authService: AuthServiceService,
    private cartService: CartsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userIsAutheticated = this.authService.getAuth();
    this.isauthstatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAutheticated = isAuthenticated;
      });

    this.userService.allUser(this.postPerPage, 1);
    this.isUserSubstatus = this.userService.getUserAsObservable().subscribe(
      (Response: { User: []; postCount: number }) => {
        this.isLoading = false;
        this.user = Response.User;
        this.totalPosts = Response.postCount;
      },
      (error) => {}
    );
    this.cartService.currentMessage.subscribe((response) => {
      this.id = response;
      console.log(response);
    });
  }

  onChangePost(pageData: PageEvent): void {
    this.isLoading = true;
    this.postPerPage = pageData.pageSize;
    this.currentPage = this.paginator.pageIndex + 1;
    this.userService.allUser(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.isUserSubstatus.unsubscribe();
    this.isauthstatusSub?.unsubscribe();
  }
}
