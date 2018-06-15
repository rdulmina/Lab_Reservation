import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageemployeesComponent } from './manageemployees.component';

describe('ManageemployeesComponent', () => {
  let component: ManageemployeesComponent;
  let fixture: ComponentFixture<ManageemployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageemployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageemployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
