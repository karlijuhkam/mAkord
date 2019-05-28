import { Component, OnInit } from '@angular/core';
import {User, UserFilter} from '../../core/model/user/user';
import {Song, SongFilter} from '../../core/model/song/song';
import {UserService} from '../../core/service/user.service';
import {SongService} from '../../core/service/song.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  topUsers: User[];
  topUsersData;
  topUsersFilter: UserFilter = new UserFilter();

  popularSongs: Song[];
  popularSongsData;
  popularSongsFilter: SongFilter = new SongFilter();

  recentSongs: Song[];
  recentSongsData;
  recentSongsFilter: SongFilter = new SongFilter();

  constructor(private userService: UserService,
              private songService: SongService) { }

  ngOnInit() {
    this.topUsersFilter.size = 10;
    this.topUsersFilter.page = 0;
    this.popularSongsFilter.size = 10;
    this.popularSongsFilter.page = 0;
    this.recentSongsFilter.size = 10;
    this.recentSongsFilter.page = 0;
    this.getRecentSongs();
    this.getPopularSongs();
    this.getTopUsers();
  }

  getTopUsers() {
    this.userService.getTopUsers(this.topUsersFilter).subscribe(
        data => {
          this.topUsers = data.content;
          this.topUsersData = data;
        });
  }

  getPopularSongs() {
    this.songService.getPopularSongs(this.popularSongsFilter).subscribe(
        data => {
          this.popularSongs = data.content;
          this.popularSongsData = data;
        });
  }

  getRecentSongs() {
    this.songService.getRecentSongs(this.recentSongsFilter).subscribe(
        data => {
          this.recentSongs = data.content;
          this.recentSongsData = data;
        });
  }

  popularPageUp() {
      this.popularSongsFilter.page = this.popularSongsData.number + 1;
      this.getPopularSongs();
  }

  popularPageDown() {
      this.popularSongsFilter.page = this.popularSongsData.number - 1;
      this.getPopularSongs();
  }

  recentPageUp() {
      this.recentSongsFilter.page = this.recentSongsData.number + 1;
      this.getRecentSongs();
  }

  recentPageDown() {
      this.recentSongsFilter.page = this.recentSongsData.number - 1;
      this.getRecentSongs();
  }

  usersPageUp() {
      this.topUsersFilter.page = this.topUsersData.number + 1;
      this.getTopUsers();
  }

  usersPageDown() {
      this.topUsersFilter.page = this.topUsersData.number - 1;
      this.getTopUsers();
  }

}
