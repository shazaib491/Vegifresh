import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCreateComponent } from './logo-create.component';

describe('LogoCreateComponent', () => {
  let component: LogoCreateComponent;
  let fixture: ComponentFixture<LogoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
