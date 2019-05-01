import { Component, OnInit } from '@angular/core';
import {BandService} from '../../core/service/band.service';
import {Band} from '../../core/model/band/band';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';

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
    this.songService.getPopularSongs().subscribe(
        data => this.popularSongs = data.content
    );
    this.songService.getRecentSongs().subscribe(
        data => this.recentSongs = data.content
    );
  }

}
