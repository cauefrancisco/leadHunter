import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OutSideClickDirective } from '../../../../shared/directives/outside-click.directive';
import { MaterialModule } from '../../../../shared/modules/material.module';

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
  public isLogged!: boolean;
  public title: any;

  constructor(
    private _router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.title = this.activatedRoute.snapshot.children.map((res) => res.data[0]);

  }

  ngOnInit() {

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
