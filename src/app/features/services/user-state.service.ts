import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  userStatus = new BehaviorSubject(false);
  userName = new BehaviorSubject('');


  constructor() { }

  public setUserStatus(value: boolean): void {
    this.userStatus.next(value);
  }

  public returnUserStatus(): boolean {
    return this.userStatus.value;
  }
  public setUserName(value: string): void {
    this.userName.next(value);
  }

  public returnUserName(): string {
    return this.userName.value;
  }
}
