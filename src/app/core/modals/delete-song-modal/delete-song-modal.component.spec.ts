import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongModalComponent } from './delete-song-modal.component';

describe('DeleteSongModalComponent', () => {
  let component: DeleteSongModalComponent;
  let fixture: ComponentFixture<DeleteSongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
