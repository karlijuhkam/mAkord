import { Component, OnInit } from '@angular/core';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  modalRef;
  userData;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private authService: AuthService,
              private toastr: ToastrService) {
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
}
