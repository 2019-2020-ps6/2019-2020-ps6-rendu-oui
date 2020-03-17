import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of user.
   * The list is retrieved from the mock.
   */
  private users: User[] = [];

  /**
   * Observable which contains the list of the users.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  constructor() {
  }

  addUser(user: User) {
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user: User) {
    this.users = this.users.filter((u: User) => u !== user);
    this.users$.next(this.users);
  }

  getUser(id: number): Observable<User> {
    return of(this.users.find(user => user.id === String(id)));
  }
}
