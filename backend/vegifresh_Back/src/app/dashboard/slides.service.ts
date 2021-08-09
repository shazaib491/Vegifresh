import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slides } from './interface/slides';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SlidesService {
  isSlidesStatusSub = new Subject<{ slides: Slides[]; postCount: number }>();
  slides: Slides[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  insertSlide(title: string, subtitle: string, image: File) {
    const slideData = new FormData();
    slideData.append('title', title);
    slideData.append('subtitle', subtitle);
    slideData.append('image', image);
    this.http
      .post<{ message: string }>(
        `${environment.sliderUrls}/insertSlide`,
        slideData
      )
      .subscribe((response) => {
        this.router.navigate(['dashboard/slides-list']);

      });
  }

  getSubSlides() {
    return this.isSlidesStatusSub.asObservable();
  }

  getSlide(pageSize: number, currentPage: number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get<{ message: string; slides: []; maxPosts }>(
        `${environment.sliderUrls}/getSlide${querParams}`
      )
      .pipe(
        map((slidersData: any) => {
          return {
            slides: slidersData.slides.map((post: any) => {
              return {
                id: post._id,
                title: post.title,
                subtitle: post.subtitle,
                image: post.image,
              };
            }),
            maxPosts: slidersData.maxPosts,
          };
        })
      )
      .subscribe(
        (slider) => {
          this.slides = slider.slides;
          this.isSlidesStatusSub.next({
            slides: this.slides,
            postCount: slider.maxPosts,
          });

        },
        (error) => {
          console.log(error);
        }
      );
  }

  getSlidesById(id: any) {
    return this.http.get(`${environment.sliderUrls}/getSlidebyId/${id}`);
  }

  getUpdateSlidebyId(id: any, title: string, subtitle: string, image: File) {
    let slidesData;
    if (typeof image == 'object') {
      slidesData = new FormData();
      slidesData.append('title', title);
      slidesData.append('subtitle', subtitle);
      slidesData.append('image', image);
    } else {
      slidesData = {
        title: title,
        subtitle: subtitle,
        image: image,
      };
    }
    this.http
      .put(`${environment.sliderUrls}/updateSlidebyId/${id}`, slidesData)
      .subscribe((data) => {
        this.router.navigate(['dashboard/slides-list']);
      });
  }

  deleteSlides(id: string) {
    return this.http.delete(`${environment.sliderUrls}/deleteSlides/${id}`);
  }
}
