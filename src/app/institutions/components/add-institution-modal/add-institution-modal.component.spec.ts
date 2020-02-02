import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionModalComponent } from './add-institution-modal.component';

describe('AddInstitutionModalComponent', () => {
  let component: AddInstitutionModalComponent;
  let fixture: ComponentFixture<AddInstitutionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstitutionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
