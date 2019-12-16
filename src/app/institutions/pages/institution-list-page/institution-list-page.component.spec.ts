import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionListPageComponent } from './institution-list-page.component';

describe('InstitutionListPageComponent', () => {
  let component: InstitutionListPageComponent;
  let fixture: ComponentFixture<InstitutionListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
