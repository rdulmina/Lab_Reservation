import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagelabsComponent } from './managelabs.component';

describe('ManagelabsComponent', () => {
  let component: ManagelabsComponent;
  let fixture: ComponentFixture<ManagelabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagelabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagelabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
