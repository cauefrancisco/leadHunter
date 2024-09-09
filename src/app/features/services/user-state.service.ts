import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  userStatus = new BehaviorSubject(false);


  constructor() { }

  public setUserStatus(value: boolean): void {
    this.userStatus.next(value);
  }

  public returnUserStatus(): boolean {
    return this.userStatus.value;
  }
}
