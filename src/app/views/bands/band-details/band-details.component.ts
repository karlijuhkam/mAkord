import { Component, OnInit } from '@angular/core';
import {Band} from '../../../core/model/band/band';
import {Song} from '../../../core/model/song/song';
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
    this.songService.getPopularSongs().subscribe(
        data => this.popularSongs = data.content
    );
    this.songService.getRecentSongs().subscribe(
        data => this.recentSongs = data.content
    );
  }
}
