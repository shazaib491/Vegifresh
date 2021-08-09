import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { booking } from '../interfaces/booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit,OnDestroy {
  private bookingListenerSub?: Subscription;
  uname?:any;
  booking?: booking[];
  constructor(private bookingService: BookingService,
    private authService:AuthService
    ) {
      this.authService.username.subscribe((name) => {
        this.uname = name;
      });
    }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.bookingListenerSub=this.bookingService.booking().subscribe(
      (response:any) =>
      {
        this.booking = response.booking;
        console.log(this.booking)
      },
      error => {},
      () => {}
    );



  }

ngOnDestroy(){
  this.bookingListenerSub?.unsubscribe();
}

}
