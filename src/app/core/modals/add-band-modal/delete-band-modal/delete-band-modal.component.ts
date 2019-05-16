import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-band-modal',
  templateUrl: './delete-band-modal.component.html',
  styleUrls: ['./delete-band-modal.component.css']
})
export class DeleteBandModalComponent implements OnInit {

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
