import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionDetailsComponent } from './edit-institution-details.component';

describe('EditInstitutionDetailsComponent', () => {
  let component: EditInstitutionDetailsComponent;
  let fixture: ComponentFixture<EditInstitutionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitutionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
