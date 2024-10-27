import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCarComponent } from './dialog-add-car.component';

describe('DialogAddCarComponent', () => {
  let component: DialogAddCarComponent;
  let fixture: ComponentFixture<DialogAddCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
