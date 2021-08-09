import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../header.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Route } from '@angular/compiler/src/core';

export interface topBarElement {
  _id: string;
  email: string;
  mobile: string;
}
let ELEMENT_DATA: topBarElement[] = [];

@Component({
  selector: 'app-topbar-create',
  templateUrl: './topbar-create.component.html',
  styleUrls: ['./topbar-create.component.css'],
})
export class TopbarCreateComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form: FormGroup;
  private mode = 'create';
  private postId: any;
  public topheader: topBarElement;
  totalPost = 0;
  postPerPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  currentPage = 1;
  label: string;
  constructor(
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      mobile: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
    });
  }
  topBarData: topBarElement[];

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.headerService
          .gettopBarbyId(this.postId)
          .subscribe((data: { response: any }) => {
            this.topheader = {
              _id: data.response._id,
              email: data.response.email,
              mobile: data.response.mobile,
            };
            this.form.setValue({
              email: this.topheader.email,
              mobile: this.topheader.mobile,
            });
          });
      } else {
        this.mode = 'create';
      }
    });
  }

  get f() {
    return this.form.controls;
  }
  displayedColumns: string[] = ['email', 'mobile', 'action'];

  addtopBar() {
    if (this.mode == 'create') {
      this.headerService.getTopBar(this.postPerPage, 1);
      this.headerService.addTopbar(this.form.value).subscribe(
        (success) => {
          this.form.reset();
          this.router.navigate(['dashboard/topbar']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.headerService.updateTopbarbyId(this.postId, this.form.value);
      this.form.reset();
    }
  }
}
