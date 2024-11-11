import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PlansComponent implements OnInit {

  public planCards: Array<any>;
  public planBenefits!: Array<any>;
  public textContent!: string;


  constructor(){
    this.planCards = [
      {title: 'Gratuito', price: '-', bOne: '50 pesquisas', bTwo: '10 Resultados por pesquisa', bThree: 'Não pesquisa por sócio'},
      {title: 'Básico', price: 'R$99,90', bOne: 'Pesquisas e resultados ilimitados', bTwo: 'Não exporta excel'},
      {title: 'Completo', price: 'R$129,90', bOne: 'Ilimitado'},
    ]

  }

  ngOnInit(){

  }

}
