import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { PrimeNgModule } from '../../../../shared/modules/primeng.module';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule
  ]
})
export class FilterSectionComponent implements OnInit {
  public form: FormGroup;
  readonly panelOpenState = signal(false);
  public states = [{ name: 'São Paulo' }, { name: 'Rio de Janeiro' }];
  public selectedState = '';
  selectedCity = '';
  cities = [{ name: 'São Paulo' }, { name: 'Campinas' }, { name: 'Guarulhos' }, { name: 'São Bernardo do Campo' }, { name: 'Santo André' }, { name: 'Osasco' }];
  citiesListObj = [{ name: 'São Paulo' }, { name: 'Campinas' }, { name: 'Guarulhos' }];

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.form = this._formBuilder.group({
      cnae: ['', []]
    })
  }

  ngOnInit() {
  }

  public clearFilters(): void {
    this.form.reset();

  }

}
