import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../shared/modules/material.module';
import { PrimeNgModule } from '../../../../../../shared/modules/primeng.module';
import { DashboardService } from '../../../../../services/dashboard.service';
import { forkJoin } from 'rxjs';
import { IFilterCnae } from '../../../../../../shared/interfaces/filter-cnae.interface';
import { AuthService } from '../../../../../services/auth.service';
import { IFilter } from '../../../../../../shared/interfaces/filter-payload.interface';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from '../../../../../../shared/modals/feedback-modal/feedback-modal.component';

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
  @Output() tableDataEvent = new EventEmitter<any>();

  public form: FormGroup;
  readonly panelOpenState = signal(false);
  public states = [{ name: 'São Paulo' }, { name: 'Rio de Janeiro' }];
  public selectedState = '';
  public doSearch = false;
  public selectedCity = '';
  public cities = [{ name: 'São Paulo' }, { name: 'Campinas' }, { name: 'Guarulhos' }, { name: 'São Bernardo do Campo' }, { name: 'Santo André' }, { name: 'Osasco' }];
  public neighbourhoods = [{ name: 'Vila olimpia' }, { name: 'Tatuapé' }, { name: 'Moema' }];
  public sectores!: Array<IFilterCnae>
  public cnaes!: Array<IFilterCnae>;
  public municipios!: Array<IFilterCnae>;
  public ncm!: Array<IFilterCnae>;
  public legalNatures!:  Array<IFilterCnae>;
  public data: any[] = [
    { position: 1, cnpj: '37984878000119', name: 'RANCK MAGRISSO', contact: '(81) 3048-2521', cnae: 'M-6911-7/01 - Serviços advocatícios', address: 'Quadra Sig Quadra 4, 106, Brasilia - Zona Industrial, DF - 70.610-440', companySize: 'pequeno' },
    { position: 2, cnpj: '97554129000183', name: 'RAPHAEL MIRANDA ADVOGADOS', contact: '(21) 3806-3650', cnae: ' M-6911-7/01 - Serviços advocatícios', address: 'Rua Visconde De Piraja, 430, Rio De Janeiro - Ipanema, RJ - 22.410-002', companySize: 'pequeno' },
    { position: 3, cnpj: '97543925000110', name: 'BRUTO E REGIS ADVOGADOS', contact: '(81) 3037-3377', cnae: 'M-6911-7/01 - Serviços advocatícios', address: 'Rua Doutor Clovis Ribeiro Vieira, 640, Franca - Sao Jose, SP - 14.401-303', companySize: 'pequeno' },
    { position: 4, cnpj: '75264400000103', name: 'Escritorio De Advocacia Antonio Jose Marques Neto', contact: '(51) 3346-2255', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 5, cnpj: '67333974000168', name: 'JJ OLIVEIRA ADVOGADOS ASSOCIADOS', contact: '(51) 3275-2450', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 6, cnpj: '42644256000181', name: 'Castilho Caracik Advogados Associados', contact: '(51) 99128-2268', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 7, cnpj: '42375188000100', name: 'Silverio Marcal Advocacia', contact: '(61) 3326-0477', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 8, cnpj: '37436877000130', name: 'Advocacia Marly Fagundes Advogados Associados', contact: '(61) 97400-8216', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 9, cnpj: '41659868000185', name: 'Jj Oliveira Advogados Associados Sociedade Simples', contact: '(61) 97400-8216', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
    { position: 10, cnpj: '46497428000192', name: 'Guimaraes E Meireles Advogados Associados', contact: '(61) 97400-8216', cnae: 'M-6911-7/01 - Serviços advocatícios', address: '', companySize: 'pequeno' },
  ];

  public userPath = '';
  public userSignatureSession = '';
  constructor(
    private _formBuilder: FormBuilder,
    private _dashboardService: DashboardService,
    private _authService: AuthService,
    private _dialog: MatDialog,
  ) {
    this.form = this._formBuilder.group({
      sector: new FormControl(),
      cnaePrimario: new FormControl(),
      cnaeSecundario: new FormControl(),
      ncm: new FormControl(),
    })
  }

  ngOnInit() {
    this. getFilterData();
  }

  public clearFilters(): void {
    this.form.reset();

  }

  public search(): void {
    this._dashboardService.isLoading.set(true);
      this.userPath = this._authService.userPath().length > 0 ? this._authService.userPath() : String(localStorage.getItem('PATH_USER'));
      const SessionSearchPath = `${this.userPath}/Empresa/PegarEmpresasSegundoFiltro`;
      const userLoginData = this._authService.userLoginData().length > 0 ? this._authService.userLoginData() : String(localStorage.getItem('LOGIN_KEY'));

      this._authService.userSessionPath.set(SessionSearchPath);
        this._authService.generateUserSignatureSession(userLoginData);

    this._authService.userKey.subscribe((res) => {
      this.userSignatureSession = res;
    });

    let filter = {
      cnae: this.form.get('sector')?.value,
    }

   const payload = {
    filtro: filter,
    ordenacao: 0,
    pagina: 0,
    }
    this._dashboardService.filterSearch(this.userPath, payload ,this.userSignatureSession).subscribe((res) => {
        this.tableDataEvent.emit(res.result);

    }, () => {
      this._dialog.open(FeedbackModalComponent, {
        data: {
          title: 'Erro!',
          text: 'Erro ao buscar dados!'
        }
          }).afterClosed().subscribe(() => this._dashboardService.isLoading.set(false));
    });
    console.log("form Value: ", this.form.value)
    console.log("form ncm Value: ", this.form.get('cnae')?.value)
  }

  public getFilterData(): void {
   this._dashboardService.getListaCnae().subscribe((res: any) => {
    this.cnaes = res?.result;
     });
   this._dashboardService.getListaNatureza().subscribe((res: any) => {
    this.legalNatures = res?.result;
     });
   this._dashboardService.getMunicipios().subscribe((res) => {
    this.municipios = res?.result;
     });
   this._dashboardService.getListaSecaoCnae().subscribe((res: any) => {
    this.sectores = res?.result;
     });
   this._dashboardService.getListaNcm().subscribe((res) => {
    this.ncm = res?.result;
     });

  }

}
