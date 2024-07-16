import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../features/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService],
  imports: [
    CommonModule,
    MaterialModule,
  ], 
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  public hidden: boolean = false;
  public userName = '';
  public isLogged!: boolean;

  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    // this.userName = this._authService.userNameDisplay;
    // this.isLogged = this._authService.userIdentified;
  }

  ngDoCheck(): void {
    this.userName = this._authService.userNameDisplay;
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }
  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public logout(): void {
    this.goTo('login');
  }


}
