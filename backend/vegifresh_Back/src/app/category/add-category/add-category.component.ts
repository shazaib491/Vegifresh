import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  logoPost: any;
  mode = 'create';
  catId: string;
  constructor(
    private router: ActivatedRoute,
    private catService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      category: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.catId = paramMap.get('id');
        this.catService
          .getCategoryByid(this.catId)
          .subscribe((data: { message: string; category: any }) => {
            this.form.setValue({
              category: data.category.catename,
            });
          });
      } else {
        this.mode = 'insert';
      }
    });
  }

  addCategory(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.mode == 'insert') {
      this.catService.addCategory(this.form.value);
    } else {
      this.catService.updateCategoryByid(this.catId, this.form.value);
    }
  }
}
