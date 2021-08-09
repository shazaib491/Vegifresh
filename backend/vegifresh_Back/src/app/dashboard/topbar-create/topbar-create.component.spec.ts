import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarCreateComponent } from './topbar-create.component';

describe('TopbarCreateComponent', () => {
  let component: TopbarCreateComponent;
  let fixture: ComponentFixture<TopbarCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
