import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],

})
export class CompanySearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
