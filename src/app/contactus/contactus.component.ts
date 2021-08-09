import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackServiceProviderService } from '../services/back-service-provider.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  private headerSubscribtion?: Subscription;
  topbar: any;
  constructor(private header: BackServiceProviderService) { }

  ngOnInit(): void {
    this.headerSubscribtion = this.header
    .header()
    .subscribe((response: { message: string; header: any }) => {
      this.topbar = response?.header;
    });
  }





  ngOnDestroy() {
    this.headerSubscribtion?.unsubscribe();
  }
}
