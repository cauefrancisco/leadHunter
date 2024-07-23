import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.scss',
  standalone: true,
  imports:[MaterialModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent implements OnInit { 
  public hidden: boolean = false;
  public userName = '';
  public isLogged!: boolean;

  constructor(
    private _router: Router,
  ) {
  }

  ngOnInit() {
  }

  public toggle(): boolean {
    return this.hidden = !this.hidden;

  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
}
