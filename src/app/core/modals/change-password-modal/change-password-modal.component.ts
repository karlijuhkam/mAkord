import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation, UserRequest} from '../../model/user/user';
import {SongRequest} from '../../model/song/song';
import {UserService} from '../../service/user.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {

  passwordFormSubmitted = false;
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private modalRef: BsModalRef,
              private userService: UserService) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  changePassword() {
    const request: UserRequest = {};

    this.passwordFormSubmitted = true;
    if (this.passwordForm.invalid) {
      return;
    }

    request.newPassword = this.passwordForm.value.newPassword;
    request.oldPassword = this.passwordForm.value.oldPassword;



    this.userService.patchProfile(request, 'Parool edukalt muudetud!')
        .subscribe(data => {
          this.close();
        });
  }

  close() {
    this.modalRef.hide();
  }

}
