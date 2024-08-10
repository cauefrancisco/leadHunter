import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { CnpjPipe } from '../../../../shared/pipes/cnpj.pipe';
import { DetailsModalComponent } from './components/details-modal/details-modal.component';

export interface ISearchCompanyTable {
  name: string;
  cnpj: string;
  contact: string;
  cnae: string;
  address: string;
  companySize: string;
  position: number;
}

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CnpjPipe
  ],

})

export class CompanySearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public ELEMENT_DATA: any[] = [
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
  displayedColumns: string[] = ['select', 'cnpjName', 'contact', 'address', 'companySize', 'cnae', 'details'];
  dataSource = new MatTableDataSource<ISearchCompanyTable>(this.ELEMENT_DATA);
  selection = new SelectionModel<ISearchCompanyTable>(true, []);

  constructor(
    private _dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openDetailsModal(): void {
    this._dialog.open(DetailsModalComponent)
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ISearchCompanyTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
