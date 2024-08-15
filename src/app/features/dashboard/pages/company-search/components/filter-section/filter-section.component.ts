import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../shared/modules/material.module';
import { PrimeNgModule } from '../../../../../../shared/modules/primeng.module';
import { CompanySearchComponent } from '../../company-search.component';

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
    PrimeNgModule,
    // CompanySearchComponent
  ],

})
export class FilterSectionComponent implements OnInit {
  @ViewChild(CompanySearchComponent) companySearchComponent!: CompanySearchComponent;

  public form: FormGroup;
  readonly panelOpenState = signal(false);
  public states = [{ name: 'São Paulo' }, { name: 'Rio de Janeiro' }];
  public selectedState = '';
  public doSearch = false;
  public selectedCity = '';
  public cities = [{ name: 'São Paulo' }, { name: 'Campinas' }, { name: 'Guarulhos' }, { name: 'São Bernardo do Campo' }, { name: 'Santo André' }, { name: 'Osasco' }];
  public neighbourhoods = [{ name: 'Vila olimpia' }, { name: 'Tatuapé' }, { name: 'Moema' }];
  public sectores = [{ name: 'Advocacia' }, { name: 'Agricultura' }, { name: 'Construção' }];

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.form = this._formBuilder.group({
      cnaePrimario: new FormControl([]),
    })
  }

  ngOnInit() {
  }

  public clearFilters(): void {
    this.form.reset();

  }

  public search(): void {
   this.doSearch = true;
  }
}
