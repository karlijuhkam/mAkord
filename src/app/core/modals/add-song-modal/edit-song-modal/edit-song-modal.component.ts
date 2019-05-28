import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Band} from '../../../model/band/band';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BandService} from '../../../service/band.service';
import {SongService} from '../../../service/song.service';
import {ToastrService} from 'ngx-toastr';
import {SongRequest} from '../../../model/song/song';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-song-modal',
  templateUrl: './edit-song-modal.component.html',
  styleUrls: ['./edit-song-modal.component.css']
})
export class EditSongModalComponent implements OnInit {

  @Output() refresh = new EventEmitter<string>();

  allBands: Band[];

  songId;
  activeSong;

  editSongForm: FormGroup;
  editSongFormSubmitted = false;

  songStatuses = [
    {
      name: 'active',
      readable: 'Aktiivne'
    },
    {
      name: 'inactive',
      readable: 'Mitteaktiivne'
    }
  ];

  constructor(private bandService: BandService,
              private songService: SongService,
              private modalRef: BsModalRef,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bandService.getAllBands().subscribe(
        data => this.allBands = data
    );
    this.songService.getAnySongById(this.songId).subscribe(
        data => {
          this.activeSong = data;
          this.editSongForm = this.formBuilder.group({
            band: [data.band],
            name: [data.name],
            author: [data.author],
            youtubeUrl: [data.youtubeUrl],
            content: [data.content],
            status: [data.status]
          });
        }
    );
  }

  editSong() {
    const request: SongRequest = {};

    this.editSongFormSubmitted = true;
    if (this.editSongForm.invalid) {
      console.log('test');
      return;
    }

    // Song details

    console.log(this.activeSong.name);
    console.log(this.editSongForm.value.name);
    if (this.activeSong.name !== this.editSongForm.value.name) {
      request.name = this.editSongForm.value.name;
    }

    if (this.activeSong.youtubeUrl !== this.editSongForm.value.youtubeUrl) {
      request.youtubeUrl = this.editSongForm.value.youtubeUrl;
    }

    if (this.activeSong.band !== this.editSongForm.value.band) {
      request.band = this.editSongForm.value.band;
    }

    if (this.activeSong.author !== this.editSongForm.value.author) {
      request.author = this.editSongForm.value.author;
    }

    if (this.activeSong.content !== this.editSongForm.value.content) {
      request.content = this.editSongForm.value.content;
    }

    if (this.activeSong.status !== this.editSongForm.value.status) {
      request.status = this.editSongForm.value.status;
    }


    this.songService.patchSong(request, this.songId, 'Laul edukalt muudetud!')
        .subscribe(data => {
          this.refresh.emit();
          this.close();
        }, (err) => {
          this.editSongFormSubmitted = false;
          this.toastr.error('Viga laulu muutmisel!', 'Viga!');
        });
  }

  close() {
    this.modalRef.hide();
  }
}
