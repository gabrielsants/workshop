import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTmoComponent } from './list-tmo.component';

describe('ListTmoComponent', () => {
  let component: ListTmoComponent;
  let fixture: ComponentFixture<ListTmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTmoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
