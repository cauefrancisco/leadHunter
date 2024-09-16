import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutSideClickDirective } from '../../../../shared/directives/outside-click.directive';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { AuthService } from '../../../services/auth.service';
import { UserStateService } from '../../../services/user-state.service';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule, OutSideClickDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent implements OnInit, DoCheck {
  public hidden: boolean = false;
  public userName = '';
  public isLogged = signal(false);
  public title: any;
  public user: string;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    public activatedRoute: ActivatedRoute,
    private _userStateService: UserStateService,
  ) {
    this.title = this.activatedRoute.snapshot.children.map((res) => res.data[0]);
    this.user = this._userStateService.returnUserName();
  }

  ngOnInit() {
    this.user = this._userStateService.returnUserName();
  }

  ngAfterViewChecked(): void {
    this.user = this._userStateService.returnUserName();
  }

  ngDoCheck() {
    this.title = this.activatedRoute.snapshot.children.map((res) => res.data[0]);
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
}
