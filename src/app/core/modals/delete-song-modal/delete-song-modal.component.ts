import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-song-modal',
  templateUrl: './delete-song-modal.component.html',
  styleUrls: ['./delete-song-modal.component.css']
})
export class DeleteSongModalComponent implements OnInit {

  @Output() delete = new EventEmitter<string>();

  constructor(private modalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm() {
    this.delete.emit();
    this.modalRef.hide();
  }

  close() {
    this.modalRef.hide();
  }

}
