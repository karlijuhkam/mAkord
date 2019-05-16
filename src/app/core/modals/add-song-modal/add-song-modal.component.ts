import { Component, OnInit } from '@angular/core';
import {BandService} from '../../service/band.service';
import {Band} from '../../model/band/band';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongRequest} from '../../model/song/song';
import {SongService} from '../../service/song.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

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
              private modalService: BsModalService,
              private modalRef: BsModalRef,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bandService.getAllBands().subscribe(
        data => this.allBands = data
    );
    this.addSongForm = this.formBuilder.group({
      band: [null],
      suggestedBandName: [''],
      songName: [null],
      author: [null],
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
    request.author = this.addSongForm.value.author;
    request.band = this.addSongForm.value.band;
    request.suggestedBand = this.addSongForm.value.suggestedBandName;
    request.content = this.addSongForm.value.content;
    request.youtubeUrl = this.addSongForm.value.youtubeUrl;


    this.songService.addSong(request, 'Uus lugu lisatud!')
        .subscribe(data => {
          this.close();
        }, (err) => this.toastr.error('Viga laulu lisamisel!'));
  }

  detectKeys(e) {
    if (e.altKey && e.ctrlKey) {
      this.addSongForm.controls.youtubeUrl.setValue('https://www.youtube.com/watch?v=Zpl51xGu9Ec');
      this.addSongForm.controls.content.setValue('   E               D\n' +
          'Suhe meil sujub ja muidu on hea\n' +
          '\t\t\t  E\n' +
          'ainult ühe asja pärast piinlema pean\n' +
          '\t\t\tD\n' +
          'vaja oleks vähe süvendada me tutvust\n' +
          '\t\t\tE\n' +
          'sina aga ajad ikka peavalu juttu\n' +
          '\n' +
          '\n' +
          'minu käest laulaksid mõnust kui lind\n' +
          'ja nagu jäätist ma lakuksin sind\n' +
          'teisi ei taha ja kui sinu käest ei saa\n' +
          'panen Raekoja platsis ennast põlema\n' +
          '\n' +
          ' A\t        A\n' +
          'MÕISTUS ON KADUNUD JA SÜDA ON PURU\n' +
          '\t   E         A\n' +
          'KÄIN NAGU KASS ÜMBER TULISE PUDRU\n' +
          '  A\t      \t\t  D\n' +
          'ANNA MULLE KLAASITÄIS VÕI KAKS PAREM VEEL\n' +
          '    D\t      E\t     A\n' +
          'OMA ARMASTUSE ALLIKA VEEST\n' +
          '\n' +
          '\n' +
          'ostes sulle pesu ja sukki ja vöid\n' +
          'ja poodidest igasugu vigureid\n' +
          'hankisin filmi made in germany\n' +
          'ja Antonio Banderase plakati\n' +
          '\n' +
          'närvid on läbi ja otsas on raha\n' +
          'aga sina oled ikka külm nagu kala\n' +
          'enam ei tea mida tegema peaks\n' +
          'nahast poen välja - baby - et sind saaks\n' +
          '\n' +
          'F#M  D  F#m  D  E');
    }
  }

  close() {
    this.modalRef.hide();
  }

}
