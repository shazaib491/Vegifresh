import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  imageById: string;
  mode = 'insert';
  productId: any;
  allCategory = [];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      p_name: new FormControl(null, { validators: [Validators.required] }),
      p_disc: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      p_price: new FormControl(null, { validators: [Validators.required] }),
      discount: new FormControl(null, { validators: [Validators.required] }),
      stock: new FormControl(null, { validators: [Validators.required] }),
      stock_range: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.productService
      .getCategory()
      .subscribe((response: { message: string; category: [] }) => {

        this.allCategory = response.category;
        console.log(response.category);

      });

    this.route.paramMap.subscribe((paramsMap: ParamMap) => {
      if (paramsMap.has('id')) {
        this.mode = 'edit';
        this.productId = paramsMap.get('id');
        this.productService
          .getProductById(this.productId)
          .subscribe((data: { message: string; product: any }) => {
            this.imageById = data.product.p_img;
            this.form.setValue({
              image: data.product.p_img,
              p_name: data.product.p_name,
              p_disc: data.product.p_disc,
              category: data.product.category,
              p_price: data.product.p_price,
              discount: data.product.discount,
              stock: data.product.stock,
              stock_range: data.product.stock_range,
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

  addProducts() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode == 'insert') {
      this.productService.addProducts(this.form.value);
    } else {
      this.productService.updateProductById(this.productId, this.form.value);
    }
    this.form.reset();
  }
}
