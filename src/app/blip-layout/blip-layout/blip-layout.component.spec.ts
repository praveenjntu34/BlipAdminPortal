import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipLayoutComponent } from './blip-layout.component';

describe('BlipLayoutComponent', () => {
  let component: BlipLayoutComponent;
  let fixture: ComponentFixture<BlipLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlipLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlipLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
