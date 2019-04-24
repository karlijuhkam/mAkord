import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';
import { transpose } from 'chord-transposer';
import {ToastrService} from 'ngx-toastr';

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
  liked;
  likeCount;

  constructor(private songService: SongService, private toastr: ToastrService) { }

  ngOnInit() {
    this.songId = parseInt(window.location.pathname.split('/')[2], 10);
    this.songService.getActiveSongById(this.songId).subscribe(
        data => {
          this.activeSong = data;
          this.chords = data.content;
          this.transposedChords = data.content;
        }
    );
    this.songService.checkIfLiked(this.songId).subscribe(
        data => {
            this.liked = data.liked;
            this.likeCount = data.likeCount;
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

  likeUnlike() {
      this.songService.likeUnlikeSong(this.songId).subscribe(
          data => {
              if (this.liked) {
                  this.toastr.success('Laul lemmikutest eemaldatud!');
                  this.likeCount--;
              } else {
                  this.toastr.success('Laul lisatud lemmikutesse!');
                  this.likeCount++;
              }
              this.liked = !this.liked;
          }
      );
  }

}
