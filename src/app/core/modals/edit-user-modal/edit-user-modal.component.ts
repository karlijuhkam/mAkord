import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongRequest} from '../../model/song/song';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserRequest} from '../../model/user/user';
import {BsModalRef} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  @Output() refresh = new EventEmitter<string>();

  userFormSubmitted = false;
  userForm: FormGroup;
  user;
  userId;
  allRoles;

  userStatuses = [
    {
      name: 'active',
      readable: 'Aktiivne'
    },
    {
      name: 'temporarily_inactive',
      readable: 'Ajutiselt mitteaktiivne'
    },
    {
      name: 'inactive',
      readable: 'Mitteaktiivne'
    }
  ];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private modalRef: BsModalRef) { }

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
      this.userForm = this.formBuilder.group({
        username: [data.username],
        roles: [data.roles[0]],
        status: [data.status]
      });
    });
    this.userService.getRoles().subscribe(
        data => this.allRoles = data
    );
  }

  editUser() {
    const request: UserRequest = {};

    this.userFormSubmitted = true;
    if (this.userForm.invalid) {
      console.log('test');
      return;
    }

    if (this.user.username !== this.userForm.value.username) {
      request.username = this.userForm.value.username;
    }

    if (this.user.roles[0] !== this.userForm.value.roles) {
      const roles = [];
      roles.push(this.userForm.value.roles);
      request.roles = roles;
    }

    if (this.user.status !== this.userForm.value.status) {
      request.status = this.userForm.value.status;
    }


    this.userService.patchUser(request, this.userId, 'Kasutaja edukalt muudetud!')
        .subscribe(data => {
          this.refresh.emit();
          this.close();
        }, (err) => {
          this.toastr.error('Viga kasutaja muutmisel!', 'Viga!');
        });
  }

  close() {
    this.modalRef.hide();
  }

}
