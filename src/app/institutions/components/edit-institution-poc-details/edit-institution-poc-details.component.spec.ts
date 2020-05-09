import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionPocDetailsComponent } from './edit-institution-poc-details.component';

describe('EditInstitutionPocDetailsComponent', () => {
  let component: EditInstitutionPocDetailsComponent;
  let fixture: ComponentFixture<EditInstitutionPocDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitutionPocDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionPocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
