import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;

  constructor( public formBuilder: FormBuilder, public userService: UserService ) {
    // Form creation
    this.userForm = this.formBuilder.group({
      lastname: [''],
      name: [''],
      fonction: false,
    });
  }

  ngOnInit() {
  }

  addUser() {
    const userToCreate: User = this.userForm.getRawValue() as User;
    userToCreate.id = String(this.userService.users$.value.length + 1);

    this.userService.addUser(userToCreate);
  }
}
