import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '../services/api';

interface IProcesso {
  processo: {
    numProcesso: string;
    nomeParte: string;
    assunto: string;
    tipoProcesso: string;
  };
  administrativo: {
    matricula: string;
    cpf: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    uf: string;
    cidade: string;
    telefone: string;
    observacoes: string;
  };
  judicial: {
    tipoAcao: string;
    poloPassivo: string;
    valorCausa: string;
  };
}

interface ProcessoContextData {
  cadastrarProcesso(
    processo: IProcesso['processo'],
    administrativo: IProcesso['administrativo'],
    judicial: IProcesso['judicial'],
    arquivos: File[]
  ): Promise<void>;
  success: boolean;
  setSuccessFalse(): void;
}

export const ProcessoContext = createContext<ProcessoContextData>(
  {} as ProcessoContextData
);

const ProcessoProvider: React.FC = ({ children }) => {
  const [success, setSuccess] = useState(false);

  const setSuccessFalse = () => {
    setSuccess(false);
  };

  const cadastrarProcesso = async (
    processo: IProcesso['processo'],
    administrativo: IProcesso['administrativo'],
    judicial: IProcesso['judicial'],
    arquivos: File[]
  ) => {
    const formProcess = new FormData();
    formProcess.append('numero_processo', processo.numProcesso);
    formProcess.append('nome_parte', processo.nomeParte);
    formProcess.append('tipo_processo', processo.tipoProcesso);
    formProcess.append('assunto', processo.assunto);

    if (processo.tipoProcesso === 'administrativo') {
      formProcess.append('matricula', administrativo.matricula);
      formProcess.append('cpf', administrativo.cpf);
      formProcess.append('endereco', administrativo.endereco);
      formProcess.append('numero', administrativo.numero);
      formProcess.append('complemento', administrativo.complemento);
      formProcess.append('bairro', administrativo.bairro);
      formProcess.append('cidade', administrativo.cidade);
      formProcess.append('uf', administrativo.uf);
      formProcess.append('telefone', administrativo.telefone);
      formProcess.append('observacoes', administrativo.observacoes);
    } else if (processo.tipoProcesso === 'judicial') {
      formProcess.append('tipo_acao', judicial.tipoAcao);
      formProcess.append('polo_passivo', judicial.poloPassivo);
      formProcess.append('valor_causa', judicial.valorCausa);
    }

    if (arquivos !== []) {
      for (let i = 0; i < arquivos.length; i += 1) {
        formProcess.append('doc', arquivos[i]);
      }
    }
    try {
      const response = await api.post('/processos', formProcess, {
        headers: { 'Content-Type': 'multipart/formdata' },
      });

      toast.success(response.data.msg);
      setSuccess(true);
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(
          'Erro ao cadastrar usuário. Tente novamente ou contate o suporte.'
        );
      }
    }
  };

  return (
    <ProcessoContext.Provider
      value={{
        cadastrarProcesso,
        success,
        setSuccessFalse,
      }}
    >
      {children}
    </ProcessoContext.Provider>
  );
};

ProcessoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProcessoProvider;
