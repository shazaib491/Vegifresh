import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopChildComponent } from './shop-child.component';

describe('ShopChildComponent', () => {
  let component: ShopChildComponent;
  let fixture: ComponentFixture<ShopChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
