import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    // this.userName = this._authService.userNameDisplay;
    // this.isLogged = this._authService.userIdentified;
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }
  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public logout(): void {
    // this._authService.userIdentified = false;
    this.goTo('login');
  }


}
