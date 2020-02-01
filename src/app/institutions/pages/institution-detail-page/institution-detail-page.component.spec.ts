import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionDetailPageComponent } from './institution-detail-page.component';

describe('InstitutionDetailPageComponent', () => {
  let component: InstitutionDetailPageComponent;
  let fixture: ComponentFixture<InstitutionDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
