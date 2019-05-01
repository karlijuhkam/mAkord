import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';
import { transpose } from 'chord-transposer';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../core/service/user.service';

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
  userData;

  constructor(private songService: SongService, private userService: UserService, private toastr: ToastrService) {
      this.userService.currentUser.subscribe(currentUser => {
          this.userData = currentUser;
      });
  }

  ngOnInit() {
    this.userService.currentUser.next(this.userData);
    this.songId = parseInt(window.location.pathname.split('/')[2], 10);
    this.songService.getActiveSongById(this.songId).subscribe(
        data => {
          this.activeSong = data;
          this.chords = data.content;
          this.transposedChords = data.content;
          this.likeCount = data.likeCount;
        }
    );
    if (this.userData) {
        this.songService.checkIfLiked(this.songId).subscribe(
            data => {
                this.liked = data.liked;
            }
        );
    }
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
          () => {
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
