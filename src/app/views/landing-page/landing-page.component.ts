import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';
import {UserService} from '../../core/service/user.service';
import {User} from '../../core/model/user/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  popularSongs: Song[];
  topUsers: User[];
  recentSongs: Song[];

  constructor(private songService: SongService,
              private userService: UserService) { }

  ngOnInit() {
    this.songService.getPopularSongs().subscribe(
        data => this.popularSongs = data.content
    );
    this.songService.getRecentSongs().subscribe(
        data => this.recentSongs = data.content
    );
    this.userService.getTopUsers().subscribe(
      data => this.topUsers = data.content
    );
  }

}
