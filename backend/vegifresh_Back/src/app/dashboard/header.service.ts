import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { logo } from './interface/logo';
export interface topBarElement {
  email: string;
  mobile: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private http: HttpClient, private router: Router) {}
  topbar = [];
  topHeader = new Subject<{
    topbarData: topBarElement[];
    postCount?: number;
  }>();

  addTopbar(data: any) {
    return this.http.post(`${environment.headerUrls}/addTopbar`, data);
  }

  getTopbarEventListener() {
    return this.topHeader.asObservable();
  }

  getTopBar(pageSize, currentPage) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;
    this.http
      .get(`${environment.headerUrls}/displayTopbar${querParams}`)
      .subscribe((data: { message: string; post: any; maxPosts: number }) => {
        this.topbar = data.post;
        this.topHeader.next({
          topbarData: [...this.topbar],
          postCount: data.maxPosts,
        });
      });
  }

  gettopBarbyId(id: any) {
    return this.http.get(`${environment.headerUrls}/displayTopbarbyId/${id}`);
  }

  updateTopbarbyId(id: any, data: any) {
    this.http
      .put(`${environment.headerUrls}/updateTopbarbyId/${id}`, data)
      .subscribe((topbar: { success: boolean; message: any }) => {
        this.router.navigate(['dashboard/topbar']);
      });
  }

  deleteTopBar(id: any) {
    return this.http.delete(`${environment.headerUrls}/deleteTopbar/${id}`);
  }

  // --------------------------------------logo section

  logoUpdated = new Subject<{ logo: any; postCount: number }>();
  logoPost: logo[] = [];

  // PostLogo
  addLogo(title: string, file: File) {
    const data = new FormData();
    data.append('title', title);
    data.append('image', file);
    this.http.post(`${environment.logoUrls}/addLogo`, data).subscribe(
      (logo: { message: string; logoPost: any }) => {
        const logoPost: logo = {
          title: logo.logoPost.title,
          imagePath: logo.logoPost.image,
        };
        this.router.navigate(['dashboard/logo-list']);
      },
      (error: { message: string }) => {
        console.log(error);
      }
    );
  }

  logoAsEventListener() {
    return this.logoUpdated.asObservable();
  }

  getLogo(pageSize:number, currentPage:number) {
    const querParams = `?pageSize=${pageSize}&page=${currentPage}`;

    this.http.get(`${environment.logoUrls}/getLogo${querParams}`).subscribe(
      (logo: { message: string; logoPost: []; maxPosts: number }) => {
        console.log(logo);

        this.logoPost = logo.logoPost;
        this.logoUpdated.next({
          logo: [...this.logoPost],
          postCount: logo.maxPosts,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLogoById(id: any) {
    return this.http.get(`${environment.logoUrls}/getLogoById/${id}`);
  }

  updateLogo(id: string, title: string, image: File | string) {
    let logoData;
    if (typeof image == 'object') {
      logoData = new FormData();
      logoData.append('title', title);
      logoData.append('image', image);
    } else {
      logoData = {
        title: title,
        image: image,
      };
    }
    this.http
      .put(`${environment.logoUrls}/updateLogoById/${id}`, logoData)
      .subscribe((data: { message: string }) => {
        this.router.navigate(['dashboard/logo-list']);
      });
  }

  deleteLogo(id: any) {
    return this.http.delete(`${environment.logoUrls}/deleteLogo/${id}`);
  }
}
