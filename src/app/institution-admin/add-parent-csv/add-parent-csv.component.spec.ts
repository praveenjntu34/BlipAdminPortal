import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentCsvComponent } from './add-parent-csv.component';

describe('AddParentCsvComponent', () => {
  let component: AddParentCsvComponent;
  let fixture: ComponentFixture<AddParentCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
