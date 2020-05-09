import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentModalComponent } from './add-parent-modal.component';

describe('AddParentModalComponent', () => {
  let component: AddParentModalComponent;
  let fixture: ComponentFixture<AddParentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
