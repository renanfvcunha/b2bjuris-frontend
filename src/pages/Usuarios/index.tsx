import React, {
  useState,
  useEffect,
  forwardRef,
  createRef,
  RefObject,
  useCallback,
  useContext,
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
import { PageTitleContext } from '../../contexts/pageTitleContext';
import NovoUsuario from './NovoUsuario';
import ModalConfirmation from '../../components/ModalConfirmation';
import EditarUsuario from './EditarUsuario';

const Usuarios: React.FC = () => {
  const classes = useStyles();
  const tableRef: RefObject<any> = createRef();
  const { handleSetPageTitle } = useContext(PageTitleContext);

  const [newUserOpen, setNewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [success, setSuccess] = useState(false);

  const refreshTable = useCallback(() => {
    if (success) {
      tableRef.current.onQueryChange();
    }
  }, [success, tableRef]);

  const setSuccessTrue = () => {
    setSuccess(true);
  };

  const handleCloseModal = () => {
    if (newUserOpen) {
      setNewUserOpen(false);
    }

    if (editUserOpen) {
      setEditUserOpen(false);
    }

    if (modalConfirmation) {
      setModalConfirmation(false);
    }
  };

  const handleRemoveUser = async () => {
    setModalConfirmation(false);

    try {
      const response = await api.delete(`/usuarios/${selectedUser}`);

      setSuccess(true);

      toast.success(response.data.msg);
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(
          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
        );
      } else if (err.response) {
        toast.error(err.response.data.msg);
      } else {
        toast.error(
          'Erro ao remover usuário. Tente novamente ou contate o suporte.'
        );
      }
    }
  };

  const dataRequestFailure = (errorMsg: string) => {
    toast.error(errorMsg);
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

  useEffect(() => {
    document.title = 'Usuários - B2B Juris';
    handleSetPageTitle('Usuários');
  }, [handleSetPageTitle]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.tableBox}>
        <div className={classes.table}>
          <ThemeProvider theme={theme}>
            <MaterialTable
              title="Lista de Usuários"
              tableRef={tableRef}
              columns={[
                {
                  title: 'ID',
                  field: 'id',
                  type: 'numeric',
                  align: 'left',
                },
                {
                  title: 'Nome',
                  field: 'nome',
                  type: 'string',
                  align: 'left',
                },
                {
                  title: 'Nome de Usuário',
                  field: 'nome_usuario',
                  type: 'string',
                  align: 'left',
                },
                {
                  title: 'E-mail',
                  field: 'email',
                  type: 'string',
                  align: 'left',
                },
                {
                  title: 'Tipo de Usuário',
                  field: 'tipo_usuario',
                  type: 'string',
                  align: 'left',
                },
              ]}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <Tooltip
                      title="Adicionar Usuário"
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
                  const url = `usuarios?per_page=${query.pageSize}&page=${
                    query.page + 1
                  }&search=${query.search}`;
                  api
                    .get(url)
                    .then(response => {
                      resolve({
                        data: response.data.users,
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
                  tooltip: 'Editar Usuário',
                  onClick: (event, rowData: any) => {
                    setEditUserOpen(true);
                    setSelectedUser(String(rowData.id));
                  },
                },
                {
                  icon: () => <Delete color="secondary" />,
                  tooltip: 'Remover Usuário',
                  onClick: (event, rowData: any) => {
                    setModalConfirmation(true);
                    setName(rowData.nome);
                    setSelectedUser(String(rowData.id));
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
      <NovoUsuario
        open={newUserOpen}
        close={handleCloseModal}
        setSuccess={setSuccessTrue}
      />
      <EditarUsuario
        open={editUserOpen}
        close={handleCloseModal}
        setSuccess={setSuccessTrue}
        idUser={selectedUser}
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

export default Usuarios;
