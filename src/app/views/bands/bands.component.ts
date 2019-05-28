import { Component, OnInit } from '@angular/core';
import {BandService} from '../../core/service/band.service';
import {Band} from '../../core/model/band/band';
import {SongService} from '../../core/service/song.service';
import {Song, SongFilter} from '../../core/model/song/song';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.css']
})
export class BandsComponent implements OnInit {

  allBands: Band[];
  popularSongs: Song[];
  recentSongs: Song[];

  constructor(private bandService: BandService,
              private songService: SongService) { }

  ngOnInit() {
    this.bandService.getAllBands().subscribe(
        data => this.allBands = data
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
