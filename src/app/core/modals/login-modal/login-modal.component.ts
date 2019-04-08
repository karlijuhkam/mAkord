import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {LoginRequest, RegisterRequest} from '../../model/user/login';
import {AuthService} from '../../service/auth.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from "@angular/common/http";

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
  registerRequest = new RegisterRequest('', '', '', '', '');
  forgotPasswordEmail = '';

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

  onForgotPassword() {
    this.isSubmitting = true;
    this.authService.forgotPasswordRequest({ email: this.forgotPasswordEmail }).subscribe(
        (data) => {
          this.isSubmitting = false;
          this.toastr.success('Uus parool saadetud emailile ' + this.forgotPasswordEmail);
        },
        (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          if (err.status === 404) {
            this.toastr.error('Sellise emailiga kasutaja puudub.');
          }
        }
    );
  }

  onRegister() {
    this.isSubmitting = true;
    this.authService.register(this.registerRequest).subscribe(
        (data) => {
          this.isSubmitting = false;
          this.rightPanelActive = true;
          this.toastr.success('Kasutaja loodud! Võite nüüd sisse logida.');
        },
        (err: HttpErrorResponse) => {
          this.isSubmitting = false;
          console.log(err);
        }
    );
  }

}
