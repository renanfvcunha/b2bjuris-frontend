import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  Divider,
  Tooltip,
  Fab,
  ThemeProvider,
  Button,
} from '@material-ui/core';
import { ArrowBack, Search, Forward, Edit } from '@material-ui/icons';

import useStyles, { Purple, Buttons } from './styles';
import { PageTitleContext } from '../../../contexts/pageTitleContext';
import DefaultBox from '../../../components/DefaultBox';
import api from '../../../services/api';
import HistoricoProcesso from './HistoricoProcesso';
import AlterarStatus from './AlterarStatus';
import EncaminharProcesso from './EncaminharProcesso';

interface IProcesso {
  numero_processo: number;
  nome_parte: string;
  tipo_processo: string;
  observacoes: string | null;
  status: {
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

const VisualizarProcesso: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { handleSetPageTitle } = useContext(PageTitleContext);
  const history = useHistory();

  const [processo, setProcesso] = useState<IProcesso>({} as IProcesso);
  const [modalHistorico, setModalHistorico] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalEncaminhar, setModalEncaminhar] = useState(false);
  const [success, setSuccess] = useState(false);

  const getProcesso = useCallback(async () => {
    const response = await api.get(`/processos/${id}`);

    setProcesso(response.data);
  }, [id]);

  const refreshData = useCallback(() => {
    if (success) {
      getProcesso();
    }
  }, [success, getProcesso]);

  const setSuccessTrue = () => {
    setSuccess(true);
  };

  const closeModal = () => {
    if (modalHistorico) {
      setModalHistorico(false);
    }

    if (modalStatus) {
      setModalStatus(false);
    }

    if (modalEncaminhar) {
      setModalEncaminhar(false);
    }
  };

  useEffect(() => {
    document.title = 'Visualizar Processo - B2B Juris';
    handleSetPageTitle('Visualizar Processo');
  }, [handleSetPageTitle]);

  useEffect(() => {
    refreshData();

    if (success) {
      setSuccess(false);
    }
    getProcesso();
  }, [refreshData, success, id, getProcesso]);

  return (
    <ThemeProvider theme={Purple}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DefaultBox scrollable>
          <Tooltip
            title="Voltar"
            aria-label="back"
            className={classes.backBtn}
            onClick={() => history.goBack()}
          >
            <Fab color="primary" size="small">
              <ArrowBack />
            </Fab>
          </Tooltip>
          <Typography
            align="center"
            component="h1"
            variant="h4"
            className={classes.title}
          >
            {`Processo nº ${processo.numero_processo}`}
          </Typography>

          <div className={classes.data}>
            <div>
              <span className={classes.key}>Nome da parte:</span>
              <span className={classes.value}>{processo.nome_parte}</span>
            </div>
            <div>
              <span className={classes.key}>Tipo de processo:</span>
              <span className={classes.value}>{processo.tipo_processo}</span>
            </div>
            {!processo.oficio ? (
              <div>
                <span className={classes.key}>Status:</span>
                <span className={classes.value}>
                  {processo.status?.status || 'Sem Status'}
                </span>
              </div>
            ) : (
              <div />
            )}
            <div>
              <span className={classes.key}>Assunto:</span>
              <span className={classes.value}>
                {processo.assunto?.assunto || 'Sem Assunto'}
              </span>
            </div>
            <div>
              <span className={classes.key}>Anexos:</span>
              <span style={{ marginLeft: 8 }}>
                {processo.arquivo && processo.arquivo.length !== 0 ? (
                  processo.arquivo.map(arquivo => (
                    <span key={arquivo.id}>
                      <a href={arquivo.url}>{arquivo.nome}</a>
                      ,&nbsp;
                    </span>
                  ))
                ) : (
                  <span className={classes.value} style={{ marginLeft: 0 }}>
                    Sem anexos
                  </span>
                )}
              </span>
            </div>

            <Divider style={{ margin: '30px 0' }} />

            {processo.administrativo ? (
              <>
                <div>
                  <span className={classes.key}>Matrícula:</span>
                  <span className={classes.value}>
                    {processo.administrativo.matricula}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>CPF:</span>
                  <span className={classes.value}>
                    {processo.administrativo.cpf}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Endereço:</span>
                  <span className={classes.value}>
                    {processo.administrativo.endereco}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Número:</span>
                  <span className={classes.value}>
                    {processo.administrativo.numero}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Complemento:</span>
                  <span className={classes.value}>
                    {processo.administrativo.complemento}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Bairro:</span>
                  <span className={classes.value}>
                    {processo.administrativo.bairro}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Cidade:</span>
                  <span className={classes.value}>
                    {processo.administrativo.cidade} -{' '}
                    {processo.administrativo.uf}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Telefone:</span>
                  <span className={classes.value}>
                    {processo.administrativo.telefone}
                  </span>
                </div>
              </>
            ) : (
              <div />
            )}

            {processo.judicial ? (
              <>
                <div>
                  <span className={classes.key}>Polo Passivo:</span>
                  <span className={classes.value}>
                    {processo.judicial.polo_passivo}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Valor da Causa:</span>
                  <span className={classes.value}>
                    {processo.judicial.valor_causa.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Tipo de Ação:</span>
                  <span className={classes.value}>
                    {processo.judicial.tipo_acao?.tipo_acao}
                  </span>
                </div>
              </>
            ) : (
              <div />
            )}

            {processo.oficio ? (
              <>
                <div>
                  <span className={classes.key}>Processo de Referência:</span>
                  <span className={classes.value}>
                    {processo.oficio.processo_ref.numero_processo}
                  </span>
                </div>
                <div>
                  <span className={classes.key}>Secretaria Remetente:</span>
                  <span className={classes.value}>
                    {processo.oficio.secretaria.secretaria}
                  </span>
                </div>
              </>
            ) : (
              <div />
            )}

            <div>
              <span className={classes.key}>Observações:</span>
              <span className={classes.value}>{processo.observacoes}</span>
            </div>
          </div>

          <div className={classes.buttons}>
            {(processo.administrativo || processo.judicial) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setModalStatus(true)}
              >
                <Edit style={{ marginRight: 8 }} />
                Alterar Status
              </Button>
            )}
            <ThemeProvider theme={Buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => setModalHistorico(true)}
              >
                <Search style={{ marginRight: 8 }} />
                Consultar Histórico
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={() => setModalEncaminhar(true)}
              >
                <Forward style={{ marginRight: 8 }} />
                Encaminhar
              </Button>
            </ThemeProvider>
          </div>
        </DefaultBox>
        <HistoricoProcesso
          open={modalHistorico}
          close={closeModal}
          historico={processo.historico}
        />
        <AlterarStatus
          open={modalStatus}
          close={closeModal}
          idProcesso={id}
          tipoProcesso={processo.tipo_processo}
          status={processo.status}
          setSuccess={setSuccessTrue}
        />
        <EncaminharProcesso
          open={modalEncaminhar}
          idProcesso={id}
          close={closeModal}
          setSuccess={setSuccessTrue}
        />
      </main>
    </ThemeProvider>
  );
};

export default VisualizarProcesso;
