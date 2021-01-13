import React, { useState, forwardRef, createRef, RefObject } from 'react';
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

import useStyles, { theme } from './styles';
import api from '../../services/api';
import NovoUsuario from './NovoUsuario';
import ModalAlert from '../../components/ModalAlert';

interface ModalAlertData {
  title: string;
  msg: string;
}

const Usuarios: React.FC = () => {
  const classes = useStyles();
  const tableRef: RefObject<any> = createRef();

  const [newUserOpen, setNewUserOpen] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalAlertData, setModalAlertData] = useState<ModalAlertData>({
    title: '',
    msg: '',
  });

  const refreshTable = () => {
    tableRef.current.onQueryChange();
  };

  const handleCloseNewUser = () => {
    setNewUserOpen(false);
  };

  const handleCloseModalAlert = () => {
    setModalAlert(false);
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
                  onClick: () => {
                    alert('Usuário Editado');
                  },
                },
                {
                  icon: () => <Delete color="secondary" />,
                  tooltip: 'Remover Usuário',
                  onClick: () => {
                    alert('Usuário Removido');
                  },
                },
                {
                  icon: () => <Refresh />,
                  tooltip: 'Atualizar',
                  isFreeAction: true,
                  onClick: refreshTable,
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
        close={handleCloseNewUser}
        refreshData={refreshTable}
      />
      <ModalAlert
        open={modalAlert}
        close={handleCloseModalAlert}
        title={modalAlertData.title}
        msg={modalAlertData.msg}
      />
    </main>
  );
};

export default Usuarios;
