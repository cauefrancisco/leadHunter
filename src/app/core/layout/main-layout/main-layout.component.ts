import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingService } from '../../../features/services/loading.service';
import { delay } from 'rxjs';
import { AuthService } from '../../../features/services/auth.service';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full'},
];


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MaterialModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  loading: boolean = false;

  constructor(
    public authService: AuthService,
  ){

  }

  ngOnInit() {
  }

  ngDoCheck(): void {

  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */

}
