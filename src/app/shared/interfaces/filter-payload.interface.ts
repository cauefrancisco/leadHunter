export interface IFilterPayload {



  filtro: IFilter,
  ordenacao: number,
  pagina: number,

}


export interface IFilter{
  cnae?: string[],
  buscarCnaesSecundarios?: boolean,
  nome?: string,
  buscarApenasNomeFantasia?: boolean,
  emailOuSite?: string,
  telefone?: string,
  cnpj?: string,
  uf?: string,
  municipio?: string,
  habitantesMaiorQue?: number,
  habitantesMenorQue?: number,
  bairro?: string,
  logradouro?: string,
  numero?: string,
  cep?: string,
  situacaoCadastral?: number,
  filtroMatrizFilaiis?: number,
  naturezaJuridica?: string,
  dataAberturaInicio?: string,
  dataAberturaFim?: string,
  filtroProgramasEspeciais?: number,
  filtroFaturamento?: number,
  porte?: string,
  capitalSocialMinimo?: 0,
  capitalSocialMaximo?: 0,
  obrigatorioSite?: true,
  obrigatorioTelefoneFixo?: true,
  obrigatorioCelular?: true,
  obrigatorioEmail?: true,
  regime?: number,
  filtroMei?: number,
  filtroDividasFederais?: number,
  lat?: number,
  lng?: number,
  raio?: number,

}
