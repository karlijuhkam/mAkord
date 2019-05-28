import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongService} from '../../core/service/song.service';
import {Song} from '../../core/model/song/song';
import {Band} from '../../core/model/band/band';
import {BandService} from '../../core/service/band.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  search;
  songResults: Song[] = [];
  bandResults: Band[] = [];

  constructor(private route: ActivatedRoute,
              private songService: SongService,
              private bandService: BandService,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search');
      this.songService.searchSongs(this.search).subscribe(
          data => this.songResults = data.content
      );
      this.bandService.searchBands(this.search).subscribe(
          data => this.bandResults = data.content
      );
    });
  }

}
