import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../shared/modules/material.module';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.scss',
  standalone: true,
  imports:[MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderDashboardComponent implements OnInit { 

  constructor(){}

  ngOnInit(): void {
    
  }
}
