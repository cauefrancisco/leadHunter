import { AfterContentChecked, ChangeDetectionStrategy, Component, DoCheck, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../features/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  viewProviders: [AuthService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, DoCheck {

  public hidden: boolean = false;
  public userName = '';
  public isLogged = false;
  public user: any;

  constructor(
    private _router: Router,
    public authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
  this.isLogged = localStorage.getItem('LOGON_NAME') !== null ? true : false;
  console.log('isLogged', this.isLogged)
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }
  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
  public logIn(): void {
    this.goTo('login');
  }


}
