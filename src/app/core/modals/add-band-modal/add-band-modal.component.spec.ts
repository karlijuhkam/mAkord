import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBandModalComponent } from './add-band-modal.component';

describe('AddBandModalComponent', () => {
  let component: AddBandModalComponent;
  let fixture: ComponentFixture<AddBandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
