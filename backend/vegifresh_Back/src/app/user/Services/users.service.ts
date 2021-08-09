import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  userAuthStatus = new Subject<{ User: []; postCount: number }>();
  allUser(pageSize: number, currentPage: number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; userPost: []; postCount: number }>(
        `${environment.userUrls}/Users${querParams}`
      )
      .subscribe(
        (response) => {
          this.userAuthStatus.next({
            User: response.userPost,
            postCount: response.postCount,
          });
        },
        (error) => {}
      );
  }

  getUserAsObservable() {
    return this.userAuthStatus.asObservable();
  }
}
