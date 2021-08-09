import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  successDom(message: string) {
    this.toastr.success(message);
  }

  generalDom(message: string) {
    this.toastr.info(message, '', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    });
  }

  errorDom(message: string) {
    this.toastr.error(message);
  }
}
