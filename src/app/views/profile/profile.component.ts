import { Component, OnInit } from '@angular/core';
import {Song, SongFilter} from '../../core/model/song/song';
import {SongService} from '../../core/service/song.service';
import {UserService} from '../../core/service/user.service';
import * as moment from 'moment';
import {AddSongModalComponent} from '../../core/modals/add-song-modal/add-song-modal.component';
import {ChangePasswordModalComponent} from '../../core/modals/change-password-modal/change-password-modal.component';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  likedSongData;
  likedSongs: Song[] = [];
  likedSongsFilter: SongFilter = new SongFilter();

  addedSongData;
  addedSongs: Song[] = [];
  addedSongsFilter: SongFilter = new SongFilter();

  user;
  registerDate;
  modalRef;

  constructor(private songService: SongService,
              private modalService: BsModalService,
              private userService: UserService) { }

  ngOnInit() {
    this.getLikedSongs();
    this.getAddedSongs();
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
        this.setDates();
      }
    );
  }

  getLikedSongs() {
    this.songService.getLikedSongs(this.likedSongsFilter).subscribe(data => {
      this.likedSongData = data;
      this.likedSongs = data.content;
    });
  }

  getAddedSongs() {
    this.songService.getAddedSongs(this.addedSongsFilter).subscribe(data => {
      this.addedSongData = data;
      this.addedSongs = data.content;
    });
  }

  setDates() {
    if (this.lessThan24HoursAgo(new Date(this.user.createTime))) {
      this.registerDate = moment(this.user.createTime).fromNow();
    } else {
      this.registerDate = moment(this.user.createTime).format('LL');
    }
  }

  lessThan24HoursAgo(date) {
    const day = 1000 * 86400;
    const aDayAgo = Date.now() - day;
    return date > aDayAgo;
  }

  openChangePasswordModal() {
      this.modalRef = this.modalService.show(ChangePasswordModalComponent, { class: 'changePasswordModal', });
  }

  likedSongsPageUp() {
    this.likedSongsFilter.page = this.likedSongData.number + 1;
    this.getLikedSongs();
  }

  likedSongsPageDown() {
    this.likedSongsFilter.page = this.likedSongData.number - 1;
    this.getLikedSongs();
  }

  addedSongsPageUp() {
    this.addedSongsFilter.page = this.addedSongData.number + 1;
    this.getAddedSongs();
  }

  addedSongsPageDown() {
    this.addedSongsFilter.page = this.addedSongData.number - 1;
    this.getAddedSongs();
  }

}
