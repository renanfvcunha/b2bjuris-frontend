import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import DefaultModal from '../../../../components/DefaultModal';
import useStyles from './styles';

interface IModal {
  open: boolean;
  close(): void;
  historico?: {
    id: number;
    descricao: string;
    created_at: string;
    usuario: {
      nome: string;
    };
  }[];
}

const HistoricoProcesso: React.FC<IModal> = ({ open, close, historico }) => {
  const classes = useStyles();
  return (
    <DefaultModal open={open} close={close}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="historico">
          <TableHead>
            <TableRow>
              <TableCell align="center">Usuário</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Data / Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historico ? (
              historico.map(hist => (
                <TableRow key={hist.id}>
                  <TableCell align="center">{hist.usuario.nome}</TableCell>
                  <TableCell align="center">{hist.descricao}</TableCell>
                  <TableCell align="center">
                    {new Date(hist.created_at).toLocaleString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </DefaultModal>
  );
};

HistoricoProcesso.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  historico: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      usuario: PropTypes.shape({
        nome: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ),
};

HistoricoProcesso.defaultProps = {
  historico: [
    {
      id: 0,
      descricao: '',
      created_at: '',
      usuario: {
        nome: '',
      },
    },
  ],
};

export default HistoricoProcesso;
