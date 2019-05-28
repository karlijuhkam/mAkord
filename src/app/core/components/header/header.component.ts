import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {AddSongModalComponent} from '../../modals/add-song-modal/add-song-modal.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  userData;
  modalRef;
  searchString;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
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
        (data) => {}
    );
  }

  openAddSongModal() {
    this.modalRef = this.modalService.show(AddSongModalComponent, { class: 'addSongModal', });
  }

  search(event) {
    this.searchString = event.target.value;
    if (event.keyCode === 13) {
      if (this.searchString.length < 2) {
        this.toastr.error('Palun sisesta vähemalt kaks tähemärki.', 'Viga!');
      } else {
        this.router.navigate(['/results'], { queryParams: { search: this.searchString}});
      }
    }
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  checkForEnter(event) {
    if (event.keyCode === 13) {
      if (this.searchString.length < 2) {
        return;
      } else {
        this.collapseNav();
      }
    }
  }

}
