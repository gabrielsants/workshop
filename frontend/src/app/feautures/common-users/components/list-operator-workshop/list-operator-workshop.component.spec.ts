import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOperatorWorkshopComponent } from './list-operator-workshop.component';

describe('ListOperatorWorkshopComponent', () => {
  let component: ListOperatorWorkshopComponent;
  let fixture: ComponentFixture<ListOperatorWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOperatorWorkshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOperatorWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
