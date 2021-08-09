import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private router: Router) {}
  iscategoryStatusSub = new Subject<{ category: []; postCount: number }>();
  category: [] = [];

  getSubSlides() {
    return this.iscategoryStatusSub.asObservable();
  }
  addCategory(cat: string) {
    this.http.post(`${environment.categoryUrls}/addCategory`, cat).subscribe(
      (response: { message: string }) => {
        this.router.navigate(['category']);
        console.log(response.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategrory(pageSize: number, currentPage: number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; category: []; maxPosts }>(
        `${environment.categoryUrls}/category${querParams}`
      )
      .subscribe(
        (response) => {
          this.category = response.category;
          this.iscategoryStatusSub.next({
            category: this.category,
            postCount: response.maxPosts,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCategoryByid(id: string) {
    return this.http.get(`${environment.categoryUrls}/categoryByid/${id}`);
  }

  updateCategoryByid(id: string, data: object) {
    this.http
      .put(`${environment.categoryUrls}/updateCategoryByid/${id}`, data)
      .subscribe((response: { message: string }) => {
        console.log(response);

        this.router.navigate(['category']);
      },error=>{
        console.log(error);

      });
  }

  deleteCategory(id: String) {
    return this.http.delete(
      `${environment.categoryUrls}/deletecategoryByid/${id}`
    );
  }
}
