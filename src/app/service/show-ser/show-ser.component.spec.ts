import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSerComponent } from './show-ser.component';

describe('ShowSerComponent', () => {
  let component: ShowSerComponent;
  let fixture: ComponentFixture<ShowSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
