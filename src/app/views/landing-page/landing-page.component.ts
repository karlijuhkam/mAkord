import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  popularSongs: Song[];
  recentSongs: Song[];

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.getPopularSongs().subscribe(
        data => this.popularSongs = data.content
    );
    this.songService.getRecentSongs().subscribe(
        data => this.recentSongs = data.content
    );
  }

  logPop() {
    console.log(this.popularSongs);
  }

  logRec() {
    console.log(this.recentSongs);
  }
}
