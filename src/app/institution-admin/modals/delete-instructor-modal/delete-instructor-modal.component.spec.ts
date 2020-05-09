import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInstructorModalComponent } from './delete-instructor-modal.component';

describe('DeleteInstructorModalComponent', () => {
  let component: DeleteInstructorModalComponent;
  let fixture: ComponentFixture<DeleteInstructorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInstructorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInstructorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
