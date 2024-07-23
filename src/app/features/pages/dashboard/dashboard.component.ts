import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderDashboardComponent } from './components/header-dashboard/header-dashboard.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PrimeNgModule } from '../../../shared/modules/primeng.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports:[
    CommonModule,
    HeaderDashboardComponent,
    MaterialModule,
    CanvasJSAngularChartsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    FormsModule,
    PrimeNgModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DashboardComponent implements OnInit, AfterContentChecked{ 

  public user = '';
  public filterRetrieved: string;
  public form: FormGroup;
  public dashboardExpanded: string;
  chart: any;
	readonly panelOpenState = signal(false);
	chartOptions = {
		animationEnabled: true,
		theme: "light2",
    options: {
      responsive: true
  		},
		axisX:{
			valueFormatString: "YYYY",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Qtd. Total",
			crosshair: {
				enabled: true
			}
		},
		toolTip:{
			shared:true
		},  
		legend:{
			cursor: "pointer",
			verticalAlign: "bottom",
			horizontalAlign: "right",
			dockInsidePlotArea: true,
			itemclick: function(e: any) {
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Empresas abertas",
			lineDashType: "dash",
			markerType: "square",
			xValueFormatString: "YYYY",
			dataPoints: [
				{ x: new Date(2010, 0, 1), y: 650 },
				{ x: new Date(2010, 0, 1), y: 650 },
				{ x: new Date(2010, 0, 1), y: 650 },
				{ x: new Date(2011, 0, 1), y: 700 },
				{ x: new Date(2012, 0, 1), y: 710 },
				{ x: new Date(2013, 0, 1), y: 658 },
				{ x: new Date(2014, 0, 1), y: 734 },
				{ x: new Date(2015, 0, 1), y: 963 },
				{ x: new Date(2016, 0, 1), y: 847 },
				{ x: new Date(2017, 0, 1), y: 853 },
				{ x: new Date(2018, 0, 1), y: 869 },
				{ x: new Date(2019, 0, 1), y: 943 },
				{ x: new Date(2020, 0, 1), y: 970 },
				{ x: new Date(2021, 0, 1), y: 869 },
				{ x: new Date(2022, 0, 1), y: 890 },
				{ x: new Date(2023, 0, 1), y: 930 }
			]
		},
		{
			type: "line",
			showInLegend: true,
			name: "Empresas fechadas",
			lineDashType: "dot",
			dataPoints: [
				{ x: new Date(2010, 0, 1), y: 510 },
				{ x: new Date(2011, 0, 1), y: 560 },
				{ x: new Date(2012, 0, 1), y: 540 },
				{ x: new Date(2013, 0, 1), y: 558 },
				{ x: new Date(2014, 0, 1), y: 544 },
				{ x: new Date(2015, 0, 1), y: 693 },
				{ x: new Date(2016, 0, 1), y: 657 },
				{ x: new Date(2017, 0, 1), y: 663 },
				{ x: new Date(2018, 0, 1), y: 639 },
				{ x: new Date(2019, 0, 1), y: 673 },
				{ x: new Date(2020, 0, 1), y: 660 },
				{ x: new Date(2021, 0, 1), y: 562 },
				{ x: new Date(2022, 0, 1), y: 643 },
				{ x: new Date(2023, 0, 1), y: 570 }
			]
		}]
	};
	public states = [{name:'São Paulo'}, {name: 'Rio de Janeiro'}];
	public selectedState = '';
  selectedCity = '';
  cities = [{ name: 'São Paulo'},{name:  'Campinas'}, {name: 'Guarulhos'}, {name: 'São Bernardo do Campo'}, {name: 'Santo André'}, {name: 'Osasco'}];
  citiesListObj =[{name: 'São Paulo'}, {name: 'Campinas'}, {name: 'Guarulhos'}];


  constructor(
    private _authService: AuthService,
	private _formBuilder: FormBuilder,
  ){
	this.form = this._formBuilder.group({
		cnae: ['', []]
	})
   this.filterRetrieved = 'col-lg-3 col-md-3 col-sm-12 col-12';
   this.dashboardExpanded = 'col-lg-9 col-md-9 col-sm-12 col-12';
  }

  ngOnInit(): void {
  }
  ngAfterContentChecked() {
    }

}
