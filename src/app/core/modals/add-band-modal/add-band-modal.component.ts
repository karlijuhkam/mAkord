import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BandService} from '../../service/band.service';
import {SongRequest} from '../../model/song/song';
import {ToastrService} from 'ngx-toastr';
import {BandRequest} from '../../model/band/band';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-add-band-modal',
  templateUrl: './add-band-modal.component.html',
  styleUrls: ['./add-band-modal.component.css']
})
export class AddBandModalComponent implements OnInit {

  @Output() refresh = new EventEmitter<string>();

  artistName = null;

  addBandForm: FormGroup;
  addBandFormSubmitted = false;

  constructor(private formBuilder: FormBuilder,
              private bandService: BandService,
              private modalRef: BsModalRef,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.addBandForm = this.formBuilder.group({
      name: [this.artistName],
      introduction: [null]
    });
  }

  addBand() {
    this.addBandFormSubmitted = true;
    if (this.addBandForm.invalid) {
      console.log('test');
      return;
    }

    const request: BandRequest = {};

    request.name = this.addBandForm.value.name;
    request.introduction = this.addBandForm.value.introduction;


    this.bandService.addBand(request, 'Uus esitaja lisatud!')
        .subscribe(data => {
          this.addBandFormSubmitted = false;
          this.refresh.emit();
          this.close();
        }, (err) => {
          this.addBandFormSubmitted = false;
          if (err.status === 409) {
            this.toastr.error('Sellise nimega esitaja on olemas.');
          } else {
            this.toastr.error('Viga esitaja lisamisel!');
          }
        });
  }

  close() {
    this.modalRef.hide();
  }

}
