import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { header } from '../interfaces/header';
import { BackServiceProviderService } from '../services/back-service-provider.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private header: BackServiceProviderService) {}
  private headerSubscribtion?: Subscription;

  topbar?: any;
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
