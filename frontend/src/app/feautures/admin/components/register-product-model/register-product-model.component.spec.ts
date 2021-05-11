import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductModelComponent } from './register-product-model.component';

describe('RegisterProductModelComponent', () => {
  let component: RegisterProductModelComponent;
  let fixture: ComponentFixture<RegisterProductModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterProductModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
