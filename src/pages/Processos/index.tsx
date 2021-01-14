import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  RefObject,
  useCallback,
} from 'react';
import MaterialTable, { Icons, MTableToolbar } from 'material-table';
import { Fab, ThemeProvider, Tooltip } from '@material-ui/core';
import {
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
  Add,
  Edit,
  Delete,
  Refresh,
} from '@material-ui/icons';
import { toast } from 'react-toastify';

import useStyles, { theme } from './styles';
import api from '../../services/api';
import ModalAlert from '../../components/ModalAlert';
import ModalConfirmation from '../../components/ModalConfirmation';

interface ModalAlertData {
  title: string;
  msg: string;
}

const Processos: React.FC = () => {
  const classes = useStyles();
  const tableRef: RefObject<any> = createRef();

  const [newUserOpen, setNewUserOpen] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAlertData, setModalAlertData] = useState<ModalAlertData>({
    title: '',
    msg: '',
  });
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [name, setName] = useState('');
  const [userToRemove, setUserToRemove] = useState(0);
  const [success, setSuccess] = useState(false);

  const refreshTable = useCallback(() => {
    if (success) {
      tableRef.current.onQueryChange();
    }
  }, [success, tableRef]);

  const setSuccessTrue = () => {
    setSuccess(true);
  };

  const handleCloseNewUser = () => {
    setNewUserOpen(false);
  };

  const handleCloseModal = () => {
    if (modalAlert) {
      setModalAlert(false);
    } else if (modalConfirmation) {
      setModalConfirmation(false);
    }
  };

  const handleRemoveUser = async () => {
    setModalConfirmation(false);

    try {
      const response = await api.delete(`/usuarios/${userToRemove}`);

      setSuccess(true);

      toast.success(response.data.msg, {
        position: 'top-center',
      });
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.',
          {
            position: 'top-center',
          }
        );
      } else if (err.response) {
        toast.error(err.response.data.msg, {
          position: 'top-center',
        });
      } else {
        toast.error(
          'Erro ao remover processo. Tente novamente ou contate o suporte.',
          {
            position: 'top-center',
          }
        );
      }
    }
  };

  const dataRequestFailure = (errorMsg: string) => {
    setModalAlertData({
      title: 'Erro',
      msg: errorMsg,
    });
    setModalAlert(true);
  };

  const tableIcons: Icons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };

  useEffect(() => {
    refreshTable();

    if (success) {
      setSuccess(false);
    }
  }, [refreshTable, success]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.tableBox}>
        <div className={classes.table}>
          <ThemeProvider theme={theme}>
            <MaterialTable
              title="Lista de Processos"
              tableRef={tableRef}
              columns={[
                {
                  title: 'ID',
                  field: 'id',
                  type: 'numeric',
                  align: 'left',
                },
                {
                  title: 'Número do Processo',
                  field: 'numero_processo',
                  type: 'numeric',
                  align: 'left',
                },
                {
                  title: 'Nome da Parte',
                  field: 'nome_parte',
                  type: 'string',
                  align: 'left',
                },
                {
                  title: 'Tipo de Processo',
                  field: 'tipo_processo',
                  type: 'string',
                  align: 'left',
                },
                {
                  title: 'Criado Em',
                  field: 'created_at',
                  type: 'datetime',
                  align: 'left',
                },
              ]}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <Tooltip
                      title="Adicionar Processo"
                      aria-label="addUser"
                      className={classes.addUserBtn}
                      onClick={() => setNewUserOpen(true)}
                    >
                      <Fab color="primary" size="small">
                        <Add />
                      </Fab>
                    </Tooltip>
                  </div>
                ),
              }}
              data={query =>
                new Promise((resolve, reject) => {
                  const url = `processos?per_page=${query.pageSize}&page=${
                    query.page + 1
                  }&search=${query.search}`;
                  api
                    .get(url)
                    .then(response => {
                      resolve({
                        data: response.data.processos,
                        page: response.data.page - 1,
                        totalCount: response.data.total,
                      });
                    })
                    .catch(err => {
                      if (err.message === 'Network Error') {
                        reject(
                          dataRequestFailure(
                            'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
                          )
                        );
                      } else if (err.response) {
                        reject(dataRequestFailure(err.response.data.msg));
                      } else {
                        reject(
                          dataRequestFailure(
                            'Ocorreu um erro na requisição dos dados.'
                          )
                        );
                      }
                    });
                })
              }
              actions={[
                {
                  icon: () => <Edit color="secondary" />,
                  tooltip: 'Editar Processo',
                  onClick: () => {
                    alert('Processo Editado');
                  },
                },
                {
                  icon: () => <Delete color="secondary" />,
                  tooltip: 'Remover Processo',
                  onClick: (event, rowData: any) => {
                    setModalConfirmation(true);
                    setName(rowData.nome);
                    setUserToRemove(rowData.id);
                  },
                },
                {
                  icon: () => <Refresh />,
                  tooltip: 'Atualizar',
                  isFreeAction: true,
                  onClick: () => tableRef.current.onQueryChange(),
                },
              ]}
              icons={tableIcons}
              localization={{
                toolbar: {
                  searchPlaceholder: 'Procurar',
                  searchTooltip: 'Procurar',
                },
                header: {
                  actions: 'Ações',
                },
                body: {
                  emptyDataSourceMessage: 'Busca não obteve resultados',
                },
                pagination: {
                  firstTooltip: 'Primeira Página',
                  lastTooltip: 'Última Página',
                  previousTooltip: 'Página Anterior',
                  nextTooltip: 'Próxima Página',
                  labelDisplayedRows: '{from}-{to} de {count}',
                  labelRowsSelect: 'linhas',
                },
              }}
              options={{
                actionsColumnIndex: -1,
                actionsCellStyle: { width: '10%' },
                headerStyle: {
                  backgroundColor: '#462e5e',
                  color: '#fff',
                },
                sorting: false,
              }}
            />
          </ThemeProvider>
        </div>
      </div>
      <ModalAlert
        open={modalAlert}
        close={handleCloseModal}
        title={modalAlertData.title}
        msg={modalAlertData.msg}
      />
      <ModalConfirmation
        open={modalConfirmation}
        close={handleCloseModal}
        confirmAction={handleRemoveUser}
        title="Alerta de Exclusão"
        msg={
          <span>
            Deseja remover permanentemente{' '}
            <span style={{ fontWeight: 'bold' }}>{name}</span>?
          </span>
        }
        cancel="Cancelar"
        confirm="Remover"
      />
    </main>
  );
};

export default Processos;