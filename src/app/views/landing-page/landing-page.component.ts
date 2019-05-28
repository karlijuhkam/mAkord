import { Component, OnInit } from '@angular/core';
import {SongService} from '../../core/service/song.service';
import {Song, SongFilter} from '../../core/model/song/song';
import {UserService} from '../../core/service/user.service';
import {User, UserFilter} from '../../core/model/user/user';
import {LoginModalComponent} from '../../core/modals/login-modal/login-modal.component';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  popularSongs: Song[];
  topUsers: User[];
  recentSongs: Song[];
  modalRef;
  userData;

  constructor(private songService: SongService,
              private modalService: BsModalService,
              private userService: UserService) {
    this.userService.currentUser.subscribe(currentUser => {
      this.userData = currentUser;
    });
  }

  ngOnInit() {
    this.getRecentSongs();
    this.getPopularSongs();
    this.getTopUsers();
  }

  openLoginModal() {
    this.modalRef = this.modalService.show(LoginModalComponent, { class: 'loginModal', });
  }

  getTopUsers() {
    const filter = new UserFilter();
    this.userService.getTopUsers(filter).subscribe(
        data => this.topUsers = data.content
    );
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
