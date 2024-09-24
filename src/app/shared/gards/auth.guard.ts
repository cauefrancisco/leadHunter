import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserStateService } from '../../features/services/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userStateService: UserStateService, private router: Router) {}

  canActivate(): boolean {
    if (this._userStateService.returnUserStatus()) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigateByUrl(''); // Redirect to login if not authenticated
      return false; // Prevent access to the route
    }
  }
}
