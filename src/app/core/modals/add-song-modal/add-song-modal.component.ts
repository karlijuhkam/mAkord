import { Component, OnInit } from '@angular/core';
import {BandService} from '../../service/band.service';
import {Band} from '../../model/band/band';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongRequest} from '../../model/song/song';
import {SongService} from '../../service/song.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-song-modal',
  templateUrl: './add-song-modal.component.html',
  styleUrls: ['./add-song-modal.component.css']
})
export class AddSongModalComponent implements OnInit {

  allBands: Band[];
  bandFromList = true;

  addSongForm: FormGroup;
  addSongFormSubmitted = false;

  constructor(private bandService: BandService,
              private songService: SongService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bandService.getAllBands().subscribe(
        data => this.allBands = data
    );
    this.addSongForm = this.formBuilder.group({
      band: [null],
      suggestedBandName: [''],
      songName: [null],
      youtubeUrl: [null],
      content: [null]
    });
    const bandControl = this.addSongForm.get('band');
    const suggestedBandControl = this.addSongForm.get('suggestedBandName');
    if (this.bandFromList) {
      suggestedBandControl.setValidators(null);
      bandControl.setValidators([Validators.required]);
    }
    if (!this.bandFromList) {
      bandControl.setValidators(null);
      suggestedBandControl.setValidators([Validators.required]);
    }
    bandControl.updateValueAndValidity();
    suggestedBandControl.updateValueAndValidity();
  }

  updateValidators(newValue) {
    this.bandFromList = newValue;
    const bandControl = this.addSongForm.get('band');
    const suggestedBandControl = this.addSongForm.get('suggestedBandName');
    if (this.bandFromList) {
      suggestedBandControl.setValidators(null);
      suggestedBandControl.setValue(null);
      bandControl.setValidators([Validators.required]);
    }

    if (!this.bandFromList) {
      bandControl.setValidators(null);
      bandControl.setValue(null);
      suggestedBandControl.setValidators([Validators.required]);
    }

    bandControl.updateValueAndValidity();
    suggestedBandControl.updateValueAndValidity();
  }

  addSong() {
    this.addSongFormSubmitted = true;
    if (this.addSongForm.invalid || !this.addSongForm.touched) {
      return;
    }

    const request: SongRequest = {};

    request.name = this.addSongForm.value.songName;
    request.band = this.addSongForm.value.band;
    request.suggestedBand = this.addSongForm.value.suggestedBandName;
    request.content = this.addSongForm.value.content;
    request.youtubeUrl = this.addSongForm.value.youtubeUrl;


    this.songService.addSong(request, 'Uus lugu lisatud!')
        .subscribe(data => {}, (err) => this.toastr.error('Viga kliendi lisamisel!'));
  }

}
