import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';
import { transpose } from 'chord-transposer';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  songId;
  activeSong: Song;
  chords;
  transposedChords;
  transposeValue = 0;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songId = parseInt(window.location.pathname.split('/')[2], 10);
    this.songService.getActiveSongById(this.songId).subscribe(
        data => {
          this.activeSong = data;
          this.chords = data.content;
          this.transposedChords = data.content;
          console.log(this.activeSong);
        }
    );
  }

  transposeUp() {
      this.transposedChords = transpose(this.transposedChords).up(1).toString();
      if (this.transposeValue === 11) {
          this.transposeValue = 0;
      } else {
          this.transposeValue++;
      }
  }

  transposeDown() {
      this.transposedChords = transpose(this.transposedChords).down(1).toString();
      if (this.transposeValue === -11) {
          this.transposeValue = 0;
      } else {
          this.transposeValue--;
      }
  }

}
