import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterPayload } from '../../shared/interfaces/filter-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public isLoading = signal(false);

  constructor(
    private _httpClient: HttpClient,
  ) { }

  public filterSearch(path: string, payload: IFilterPayload, signatureSession: string): Observable<any>{
    const url = `http://192.168.5.4:11117/${path}/Empresa/PegarEmpresasSegundoFiltro?session_signature=${signatureSession}`;
    return this._httpClient.post(url,
      { dados:   {
        payload
    }
    });
  }


  public getListaCnae(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaCnaes`;
    return this._httpClient.get(url);
  }
  public getListaNatureza(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaNaturezas`;
    return this._httpClient.get(url);
  }
  public getMunicipios(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaMunicipios`;
    return this._httpClient.get(url);
  }
  public getListaPortes(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaPortes`;
    return this._httpClient.get(url);
  }
  public getUnidadeFederativa(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaUnidadeFederativa`;
    return this._httpClient.get(url);
  }
  public getListaSecaoCnae(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaSecaoCnae`;
    return this._httpClient.get(url);
  }

  public getListaNcm(): Observable<any> {
    const url = `http://192.168.5.4:11117/dados_auxiliares/InformacoesAuxiliares/PegarListaNCM`;
    return this._httpClient.get(url);
  }
}
