import { Component, OnInit } from '@angular/core';
import {UserFilter} from '../../core/model/user/user';
import {UserService} from '../../core/service/user.service';
import {SongFilter} from '../../core/model/song/song';
import {SongService} from '../../core/service/song.service';
import {BandFilter} from '../../core/model/band/band';
import {BandService} from '../../core/service/band.service';
import {AddSongModalComponent} from '../../core/modals/add-song-modal/add-song-modal.component';
import {BsModalService} from 'ngx-bootstrap';
import {AddBandModalComponent} from '../../core/modals/add-band-modal/add-band-modal.component';
import {EditSongModalComponent} from '../../core/modals/add-song-modal/edit-song-modal/edit-song-modal.component';
import {DeleteSongModalComponent} from '../../core/modals/delete-song-modal/delete-song-modal.component';
import {EditBandModalComponent} from '../../core/modals/add-band-modal/edit-band-modal/edit-band-modal.component';
import {DeleteBandModalComponent} from '../../core/modals/add-band-modal/delete-band-modal/delete-band-modal.component';
import {EditUserModalComponent} from '../../core/modals/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  // Kasutaja muutujad

  allUsers: any = {};
  userData: any = [];
  currentUserFilter: string;
  userFilter: UserFilter = new UserFilter();
  totalUsers = 0;

  // Esitaja muutujad

  allBands: any = {};
  bandData: any = [];
  currentBandFilter: string;
  bandFilter: BandFilter = new BandFilter();
  totalBands = 0;

  // Laulu muutujad

  allSongs: any = {};
  songData: any = [];
  currentSongFilter: string;
  songFilter: SongFilter = new SongFilter();
  totalSongs = 0;
  activeSongs = 0;
  inactiveSongs = 0;

  activeTab = 'users';
  modalRef;

  statuses = [
    {
      name: 'active',
      readable: 'Aktiivne'
    },
    {
      name: 'temporarily_inactive',
      readable: 'Ajutiselt peatatud'
    },
    {
      name: 'inactive',
      readable: 'Mitteaktiivne'
    }
  ];

  songStatuses = [
    {
      name: 'active',
      readable: 'Aktiivne'
    },
    {
      name: 'inactive',
      readable: 'Mitteaktiivne'
    }
  ];


  roles = [
    {
      name: 'user',
      readable: 'Tavakasutaja'
    },
    {
      name: 'moderator',
      readable: 'Moderaator'
    },
    {
      name: 'admin',
      readable: 'Administraator'
    }
  ];

  constructor(private userService: UserService,
              private songService: SongService,
              private bandService: BandService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getFilteredUsers();
    this.userService.getUsers(this.userFilter).subscribe(
        (result) => {
          this.totalUsers = result.totalElements;
        }
    );
    this.getFilteredBands();
    this.bandService.getBands(this.bandFilter).subscribe(
        (result) => {
          this.totalBands = result.totalElements;
        }
    );
    this.getFilteredSongs();
    this.getSongsCount();
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  // Kasutaja funktsioonid

  getFilteredUsers(): void {
    if (JSON.stringify(this.userFilter) !== this.currentUserFilter) {
      this.userFilter.page = 0;
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.getUsers(this.userFilter).subscribe(
        (result) => {
          this.currentUserFilter = JSON.stringify(this.userFilter);
          this.allUsers = result;
          this.userData = result.content;
        }
    );
  }

  setUserPage(col) {
    this.userFilter.page = col.offset;
    this.getUsers();
  }

  onUserSort(event) {
    this.userFilter.sortDir = event.newValue.toUpperCase();
    this.userFilter.sort = event.column.prop;
    this.getFilteredUsers();
  }

  userFilterKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === 13 || event.type === 'click') {
      this.getFilteredUsers();
    }
  }

  editUser(id) {
      console.log('Editing user no.' + id);
  }

  // Esitaja funktsioonid

  getFilteredBands(): void {
    if (JSON.stringify(this.bandFilter) !== this.currentBandFilter) {
      this.userFilter.page = 0;
      this.getBands();
    }
  }

  getBands() {
    this.bandService.getBands(this.bandFilter).subscribe(
        (result) => {
          this.currentBandFilter = JSON.stringify(this.bandFilter);
          this.allBands = result;
          this.bandData = result.content;
        }
    );
  }

  setBandPage(col) {
    this.bandFilter.page = col.offset;
    this.getBands();
  }

  onBandSort(event) {
    this.bandFilter.sortDir = event.newValue.toUpperCase();
    this.bandFilter.sort = event.column.prop;
    this.getFilteredBands();
  }

  bandFilterKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === 13 || event.type === 'click') {
      this.getFilteredBands();
    }
  }

  openEditBandModal(id) {
    console.log(id);
    const initialState = {
      bandId: id.id
    };
    this.modalRef = this.modalService.show(EditBandModalComponent, { class: 'addSongModal', initialState});
    this.modalRef.content.refresh.subscribe(($event) => {
      this.getBands();
    });
  }

  deleteBand(id) {
    this.bandService.deleteBand(id, 'Esitaja kustutatud.').subscribe(
        data => {
          this.bandService.getBands(this.bandFilter).subscribe(
              (result) => {
                this.totalBands = result.totalElements;
              }
          );
          this.getBands();
        }
    );
  }

  openDeleteBandModal(id) {
    this.modalRef = this.modalService.show(DeleteBandModalComponent, { class: 'modal-sm'});
    this.modalRef.content.delete.subscribe(($event) => {
      this.deleteBand(id);
    });
  }

  openAddBandModalComponent() {
    this.modalRef = this.modalService.show(AddBandModalComponent, { class: 'addSongModal'});
    this.modalRef.content.refresh.subscribe(($event) => {
      this.bandService.getBands(this.bandFilter).subscribe(
          (result) => {
            this.totalBands = result.totalElements;
          }
      );
      this.getBands();
    });
  }

  openPrefilledBandModal(name) {
    const initialState = {
      artistName: name
    };
    this.modalRef = this.modalService.show(AddBandModalComponent, { class: 'addSongModal', initialState});
  }

  // Laulu funktsioonid

  getFilteredSongs(): void {
    if (JSON.stringify(this.songFilter) !== this.currentSongFilter) {
      this.songFilter.page = 0;
      this.getSongs();
    }
  }

  getSongs() {
    this.songService.getSongs(this.songFilter).subscribe(
        (result) => {
          this.currentSongFilter = JSON.stringify(this.songFilter);
          this.allSongs = result;
          this.songData = result.content;
        }
    );
  }

  getActiveSongCount() {
    const filter = new SongFilter();
    filter.status = 'active';
    this.songService.getSongs(filter).subscribe(
        (result) => {
          this.activeSongs = result.totalElements;
        }
    );
  }

  getInactiveSongCount() {
    const filter = new SongFilter();
    filter.status = 'inactive';
    this.songService.getSongs(filter).subscribe(
        (result) => {
          this.inactiveSongs = result.totalElements;
        }
    );
  }

  getSongsCount() {
    this.songService.getSongs(this.songFilter).subscribe(
        (result) => {
          this.totalSongs = result.totalElements;
        }
    );
    this.getActiveSongCount();
    this.getInactiveSongCount();
  }

  setSongPage(col) {
    this.songFilter.page = col.offset;
    this.getSongs();
  }

  onSongSort(event) {
    this.songFilter.sortDir = event.newValue.toUpperCase();
    this.songFilter.sort = event.column.prop;
    this.getFilteredSongs();
  }

  songFilterKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === 13 || event.type === 'click') {
      this.getFilteredSongs();
    }
  }

  openEditSongModal(id) {
    const initialState = {
      songId: id.id
    };
    this.modalRef = this.modalService.show(EditSongModalComponent, { class: 'addSongModal', initialState});
    this.modalRef.content.refresh.subscribe(($event) => {
        this.getSongsCount();
        this.getSongs();
    });
  }

  openEditUserModal(id) {
    const initialState = {
      userId: id.id
    };
    this.modalRef = this.modalService.show(EditUserModalComponent, { class: 'addSongModal', initialState});
    this.modalRef.content.refresh.subscribe(($event) => {
      this.getUsers();
    });
  }

  deleteSong(id) {
    this.songService.deleteSong(id, 'Laul kustutatud.').subscribe(
        data => {
          this.getSongsCount();
          this.getSongs();
        }
    );
  }

  openDeleteSongModal(id) {
    this.modalRef = this.modalService.show(DeleteSongModalComponent, { class: 'modal-sm'});
    this.modalRef.content.delete.subscribe(($event) => {
      this.deleteSong(id);
    });
  }
}
