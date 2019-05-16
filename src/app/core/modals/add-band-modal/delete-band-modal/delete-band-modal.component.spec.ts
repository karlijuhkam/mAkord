import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBandModalComponent } from './delete-band-modal.component';

describe('DeleteBandModalComponent', () => {
  let component: DeleteBandModalComponent;
  let fixture: ComponentFixture<DeleteBandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
