import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAbbreviationPipe  } from './number-abbreviation-pipe.component';

describe('NumberAbbreviationPipeComponent', () => {
  let component:NumberAbbreviationPipe ;
  let fixture: ComponentFixture<NumberAbbreviationPipe >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberAbbreviationPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberAbbreviationPipe );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
