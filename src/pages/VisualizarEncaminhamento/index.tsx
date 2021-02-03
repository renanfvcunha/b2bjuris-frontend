import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  Divider,
  Tooltip,
  Fab,
  ThemeProvider,
  Button,
} from '@material-ui/core';
import {
  ArrowBack,
  Forward,
  Edit,
  AssignmentTurnedIn,
} from '@material-ui/icons';

import useStyles, { Purple, Buttons } from './styles';
import { PageTitleContext } from '../../contexts/pageTitleContext';
import DefaultBox from '../../components/DefaultBox';
import IProcesso from '../../typescript/IProcesso';
import api from '../../services/api';
import AlterarProcesso from './AlterarProcesso';

const VisualizarEncaminhamento: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { handleSetPageTitle } = useContext(PageTitleContext);
  const history = useHistory();

  const [processo, setProcesso] = useState<IProcesso>({} as IProcesso);
  const [modalAlterarProcesso, setModalAlterarProcesso] = useState(false);
  const [modalEncaminhar, setModalEncaminhar] = useState(false);
  const [success, setSuccess] = useState(false);

  const getProcesso = useCallback(async () => {
    const response = await api.get(`/encaminhamentos/${id}`);

    setProcesso(response.data);
  }, [id]);

  const refreshData = useCallback(() => {
    if (success) {
      getProcesso();
    }
  }, [success, getProcesso]);

  /* const setSuccessTrue = () => {
    setSuccess(true);
  }; */

  const closeModal = () => {
    if (modalAlterarProcesso) {
      setModalAlterarProcesso(false);
    }

    if (modalEncaminhar) {
      setModalEncaminhar(false);
    }
  };

  const breakTextArea = (text: string, user: string) => {
    const newText = text.split('\n').map(str => (
      <div key={Math.random()} className={classes.value}>
        <span>{str}</span>
        <br />
      </div>
    ));

    return (
      <Fragment key={Math.random()}>
        <br />
        <span>- {user}:</span>
        {newText}
      </Fragment>
    );
  };

  useEffect(() => {
    document.title = 'Visualizar Encaminhamento - B2B Juris';
    handleSetPageTitle('Visualizar Encaminhamento');
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
            Processo nº {processo.numero_processo}
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
            <div>
              <span className={classes.key}>Tipo de encaminhamento:</span>
              <span className={classes.value}>
                {processo.encaminhamento
                  ? processo.encaminhamento[0].tipo_encaminhamento
                      .tipo_encaminhamento
                  : ''}
              </span>
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
              {processo.observacoes && processo.observacoes.length !== 0 ? (
                processo.observacoes.map(observacoes =>
                  breakTextArea(
                    observacoes.observacoes,
                    observacoes.usuario.nome
                  )
                )
              ) : (
                <span className={classes.value}>Não há observações</span>
              )}
            </div>
          </div>

          <div className={classes.buttons}>
            <ThemeProvider theme={Buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => setModalAlterarProcesso(true)}
              >
                <Edit className={classes.icon} />
                Alterar Processo
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={() => setModalEncaminhar(true)}
              >
                <Forward className={classes.icon} />
                Encaminhar
              </Button>
            </ThemeProvider>
            <Button variant="contained" color="primary" className={classes.btn}>
              <AssignmentTurnedIn className={classes.icon} />
              Finalizar Processo
            </Button>
          </div>
        </DefaultBox>
        <AlterarProcesso
          open={modalAlterarProcesso}
          close={closeModal}
          tipoProcesso={processo.tipo_processo}
          idStatus={String(processo.status?.id)}
          idProcesso={id}
          refreshData={getProcesso}
        />
      </main>
    </ThemeProvider>
  );
};

export default VisualizarEncaminhamento;
