import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParentModalComponent } from './edit-parent-modal.component';

describe('EditParentModalComponent', () => {
  let component: EditParentModalComponent;
  let fixture: ComponentFixture<EditParentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
