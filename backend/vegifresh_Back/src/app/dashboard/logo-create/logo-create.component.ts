import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderService } from '../header.service';
import { logo } from './../interface/logo';

@Component({
  selector: 'app-logo-create',
  templateUrl: './logo-create.component.html',
  styleUrls: ['./logo-create.component.css'],
})
export class LogoCreateComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  logoPost: logo[] = [];
  mode = 'create';
  logoId: string;
  logoImage: any;
  constructor(
    private headerService: HeaderService,
    private router: ActivatedRoute
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((paramsMap: ParamMap) => {
      if (paramsMap.has('id')) {
        this.mode = 'edit';
        this.logoId = paramsMap.get('id');
        this.headerService
          .getLogoById(this.logoId)
          .subscribe((logo: { message: string; LogoPost: any }) => {
            this.logoImage = logo.LogoPost.image;
            this.form.setValue({
              title: logo.LogoPost.title,
              image: logo.LogoPost.image,
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

  displayedColumns: string[] = ['title', 'Image', 'Action'];

  getImage(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.form.get('image').updateValueAndValidity();
  }

  addLogo() {
    if (this.mode == 'create') {
      this.headerService.addLogo(this.form.value.title, this.form.value.image);
    } else {
      this.headerService.updateLogo(
        this.logoId,
        this.form.value.title,
        this.form.value.image
      );
    }

    this.form.reset();
  }


}
