import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { payment } from '../interfaces/payment';
import { BackServiceProviderService } from '../services/back-service-provider.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderId?: number;
  parameter?: any;
  customerPays: any;
  constructor(
    private homeService: BackServiceProviderService,
    private router: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.customerPays = {
      customerId: '',
      fname: '',
      email: '',
      address: '',
      mobile: '',
      paymentResponse: false,
      totalAmount: '',
      discount: '',
    };
    this.homeService
      .CustomerBankId()
      .subscribe((response: { message: string; bankDetail: payment }) => {
        this.customerPays = response?.bankDetail;
      });
  }

  paymentMode(form: NgForm) {
    this.homeService.orderPayment(form.value).subscribe(
      (response: { message: string; orders: any }) => {
        this.orderId = response.orders.id;
        this.payWithRazorpay(this.orderId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logo: any;

  payWithRazorpay(orderId: any) {
    this.homeService.logo().subscribe((post: any) => {
      this.logo = post.logo.image;
    });
    const options: any = {
      key: 'rzp_test_6pkBsTKr8DpzCx',
      amount: this.customerPays?.totalAmount,
      currency: 'INR',
      name: this.customerPays?.fname,
      description: 'VegiFresh',
      image: this.logo,
      order_id: orderId,
      modal: { escape: false },
      theme: {
        color: '#0c238a',
      },
    };
    options.handler = (response: any, error: Error) => {
      options.response = response;
      this.parameter = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        amount: this.customerPays?.totalAmount,
      };
      this.homeService.verifyPayment(this.parameter).subscribe((data: any) => {
        this.toaster.successDom(
          'Booked Successfuly Product will be delivered Soon'
        );
        this.router.navigate(['/booking']);
      });
    };
    options.modal.ondismiss = () => {
      console.log('Transaction cancelled.');
    };
    const rzp = new this.homeService.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
