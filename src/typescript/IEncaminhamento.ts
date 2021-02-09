export default interface IEncaminhamento {
  id: number;
  recebido: boolean;
  prazo: string;
  observacoes: string;
  tipo_encaminhamento: {
    tipo_encaminhamento: string;
  };
  processo: {
    id: number;
    numero_processo: string;
    tipo_processo: string;
    created_at: string;
  };
}
