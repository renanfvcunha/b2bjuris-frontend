import React, { useState, forwardRef } from 'react';
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
import NovoUsuario from './NovoUsuario';

const Usuarios: React.FC = () => {
  const classes = useStyles();
  const [newUserOpen, setNewUserOpen] = useState(false);

  const handleCloseNewUser = () => {
    setNewUserOpen(false);
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
              // tableRef={tableRef}
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
                  title: 'Tipo de Usuário',
                  field: 'tipo_usuario',
                  type: 'string',
                  align: 'left',
                },
              ]}
              data={[
                {
                  id: 1,
                  nome: 'Renan Cunha',
                  nome_usuario: 'renancunha',
                  tipo_usuario: 'Admin',
                },
                {
                  id: 2,
                  nome: 'José Carlos',
                  nome_usuario: 'zeca',
                  tipo_usuario: 'Usuário',
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
              /* data={query =>
              new Promise((resolve, reject) => {
                const url = `users?per_page=${query.pageSize}&page=${
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
                  .catch(() => {
                    reject(dataRequestFailure());
                  });
              })} */
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
                  onClick: () => {
                    alert('Dados Atualizados.');
                  },
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
      <NovoUsuario open={newUserOpen} close={handleCloseNewUser} />
    </main>
  );
};

export default Usuarios;
