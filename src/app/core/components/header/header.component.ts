import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {AddSongModalComponent} from '../../modals/add-song-modal/add-song-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData;
  modalRef;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private authService: AuthService) {
    this.userService.currentUser.subscribe(currentUser => {
      this.userData = currentUser;
    });
  }

  ngOnInit() {
    this.userService.currentUser.next(this.userData);
  }

  openLoginModal() {
    this.modalRef = this.modalService.show(LoginModalComponent, { class: 'loginModal', });
  }

  onLogout() {
    this.authService.logoutRequest().subscribe(
        (data) => console.log(data),
        err => console.log(err)
    );
  }

  openAddSongModal() {
    this.modalRef = this.modalService.show(AddSongModalComponent, { class: 'addSongModal', });
  }


}
