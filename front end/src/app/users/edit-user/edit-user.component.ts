import { Component, OnInit, Input} from '@angular/core';
import { User } from '../../../models/user.model';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input()
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe((user) => {this.user = user; });
  }
}
