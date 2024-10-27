import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalregistrerComponent } from './modalregistrer.component';

describe('ModalregistrerComponent', () => {
  let component: ModalregistrerComponent;
  let fixture: ComponentFixture<ModalregistrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalregistrerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalregistrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
