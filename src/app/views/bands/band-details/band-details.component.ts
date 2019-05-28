import { Component, OnInit } from '@angular/core';
import {Band} from '../../../core/model/band/band';
import {Song, SongFilter} from '../../../core/model/song/song';
import {BandService} from '../../../core/service/band.service';
import {SongService} from '../../../core/service/song.service';

@Component({
  selector: 'app-band-details',
  templateUrl: './band-details.component.html',
  styleUrls: ['./band-details.component.css']
})
export class BandDetailsComponent implements OnInit {

  popularSongs: Song[];
  recentSongs: Song[];
  bandSongs: Song[];
  activeBand: Band;
  bandId;

  constructor(private bandService: BandService,
              private songService: SongService) { }

  ngOnInit() {
    this.bandId = parseInt(window.location.pathname.split('/')[2], 10);
    this.bandService.getBandById(this.bandId).subscribe(
        data => {
          this.activeBand = data;
        }
    );
    this.songService.getSongsByBand(this.bandId).subscribe(
        data => this.bandSongs = data
    );
    this.getPopularSongs();
    this.getRecentSongs();
  }

  getPopularSongs() {
    const filter = new SongFilter();
    this.songService.getPopularSongs(filter).subscribe(
        data => this.popularSongs = data.content
    );
  }

  getRecentSongs() {
    const filter = new SongFilter();
    this.songService.getRecentSongs(filter).subscribe(
        data => this.recentSongs = data.content
    );
  }
}
