import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BandService} from '../../../service/band.service';
import {SongRequest} from '../../../model/song/song';
import {BandRequest} from '../../../model/band/band';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-band-modal',
  templateUrl: './edit-band-modal.component.html',
  styleUrls: ['./edit-band-modal.component.css']
})
export class EditBandModalComponent implements OnInit {

  @Output() refresh = new EventEmitter<string>();

  editBandForm: FormGroup;
  editBandFormSubmitted = false;
  activeBand;
  bandId;

  constructor(private formBuilder: FormBuilder,
              private bandService: BandService,
              private toastr: ToastrService,
              private modalRef: BsModalRef) { }

  ngOnInit() {
    this.bandService.getBandById(this.bandId).subscribe(
        data => {
          this.activeBand = data;
          this.editBandForm = this.formBuilder.group({
            name: [this.activeBand.name],
            introduction: [this.activeBand.introduction]
          });
        }
    );
  }

  editBand() {
    const request: BandRequest = {};

    this.editBandFormSubmitted = true;
    if (this.editBandForm.invalid) {
      return;
    }

    if (this.activeBand.name !== this.editBandForm.value.name) {
      request.name = this.editBandForm.value.name;
    }

    if (this.activeBand.introduction !== this.editBandForm.value.introduction) {
      request.introduction = this.editBandForm.value.introduction;
    }

    this.bandService.patchBand(request, this.bandId, 'Esitaja edukalt muudetud!')
        .subscribe(data => {
          this.refresh.emit();
          this.close();
        }, (err) => {
          this.toastr.error('Viga esitaja muutmisel!');
        });
    }

    close() {
      this.modalRef.hide();
    }

}
