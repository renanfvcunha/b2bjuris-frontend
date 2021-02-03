export default interface IProcesso {
  numero_processo: number;
  nome_parte: string;
  tipo_processo: string;
  observacoes: {
    id: number;
    observacoes: string;
    usuario: {
      nome: string;
    };
  }[];
  status: {
    id: number;
    status: string;
  } | null;
  arquivo: {
    id: number;
    nome: string;
    url: string;
  }[];
  historico: {
    id: number;
    descricao: string;
    created_at: string;
    usuario: {
      nome: string;
    };
  }[];
  assunto: {
    assunto: string;
  } | null;
  encaminhamento: {
    id: number;
    recebido: boolean;
    usuario: {
      nome: string;
    };
    tipo_encaminhamento: {
      tipo_encaminhamento: string;
    };
  }[];
  administrativo?: {
    matricula: number;
    cpf: string;
    endereco: string;
    numero: number;
    complemento: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    telefone: string;
  };
  judicial?: {
    tipo_acao: {
      id: number;
      tipo_acao: string;
    };
    polo_passivo: string;
    valor_causa: number;
  };
  oficio?: {
    processo_ref: {
      numero_processo: number;
    };
    secretaria: {
      secretaria: string;
    };
  };
}
