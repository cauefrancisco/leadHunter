import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FilterSectionComponent } from '../components/filter-section/filter-section.component';
import { HeaderDashboardComponent } from '../components/header-dashboard/header-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderDashboardComponent,
    FilterSectionComponent,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './main-dashboard-layout.component.html',
  styleUrl: './main-dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDashboardLayoutComponent { }
