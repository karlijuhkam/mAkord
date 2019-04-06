import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {LoginRequest} from '../../model/user/login';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  isSubmitting = false;
  rightPanelActive = false;
  forgotPassword = false;
  loginRequest = new LoginRequest('', '');

  constructor(private modalRef: BsModalRef,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalRef.hide();
  }

  onLogin() {
    this.isSubmitting = true;
    this.authService.loginRequest(this.loginRequest).subscribe((data) => {
      this.isSubmitting = false;
      this.toastr.success('Tere tulemast, ' + data.user.firstName + ' ' + data.user.lastName);
      this.closeModal();
    }, (err) => {
      this.isSubmitting = false;
      this.toastr.error('Vale kasutaja või parool');
    });
  }

}
