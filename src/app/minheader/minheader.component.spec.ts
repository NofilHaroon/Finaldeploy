import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinheaderComponent } from './minheader.component';

describe('MinheaderComponent', () => {
  let component: MinheaderComponent;
  let fixture: ComponentFixture<MinheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
