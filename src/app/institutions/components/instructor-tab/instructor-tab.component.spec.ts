import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTabComponent } from './instructor-tab.component';

describe('InstructorTabComponent', () => {
  let component: InstructorTabComponent;
  let fixture: ComponentFixture<InstructorTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
