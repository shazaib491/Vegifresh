import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Slides } from '../interface/slides';
import { SlidesService } from '../slides.service';

@Component({
  selector: 'app-slide-create',
  templateUrl: './slide-create.component.html',
  styleUrls: ['./slide-create.component.css'],
})
export class SlideCreateComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  imageById: string;
  mode = 'insert';
  slidesId: any;
  constructor(
    private sliderService: SlidesService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      subtitle: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      if (paramsMap.has('id')) {
        this.mode = 'edit';
        this.slidesId = paramsMap.get('id');
        this.sliderService
          .getSlidesById(this.slidesId)
          .subscribe((data: { message: string; slides: any }) => {
            this.imageById = data.slides.image;
            this.form.setValue({
              title: data.slides.title,
              subtitle: data.slides.subtitle,
              image: data.slides.image,
            });
          });
      } else {
        this.mode = 'insert';
      }
    });
  }

  getImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addSlides() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode == 'insert') {
      this.sliderService.insertSlide(
        this.form.value.title,
        this.form.value.subtitle,
        this.form.value.image
      );
    } else {
      this.sliderService.getUpdateSlidebyId(
        this.slidesId,
        this.form.value.title,
        this.form.value.subtitle,
        this.form.value.image
      );
    }
  }
}
