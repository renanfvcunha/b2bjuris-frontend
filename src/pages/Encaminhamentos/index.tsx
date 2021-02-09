import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { AssignmentOutlined } from '@material-ui/icons';

import { PageTitleContext } from '../../contexts/pageTitleContext';
import DefaultBox from '../../components/DefaultBox';
import useStyles from './styles';
import ModalProcesso from './ModalProcesso';
import IEncaminhamento from '../../typescript/IEncaminhamento';
import api from '../../services/api';

const Encaminhamento: React.FC = () => {
  const classes = useStyles();
  const { handleSetPageTitle } = useContext(PageTitleContext);

  const [modalProcesso, setModalProcesso] = useState(false);
  const [selectedEncaminhamento, setSelectedEncaminhamento] = useState<
    IEncaminhamento
  >();
  const [encaminhamentos, setEncaminhamentos] = useState<IEncaminhamento[]>([]);
  const [success, setSuccess] = useState(false);

  const handleCloseModal = () => {
    if (modalProcesso) {
      setModalProcesso(false);
    }
  };

  const setSuccessTrue = () => {
    setSuccess(true);
  };

  const handleSetSelectedEncaminhamento = (i: number) => {
    setSelectedEncaminhamento(encaminhamentos[i]);
  };

  const handleOpenModalProcesso = useCallback(() => {
    if (selectedEncaminhamento) {
      setModalProcesso(true);
    }
  }, [selectedEncaminhamento]);

  const getEncaminhamentos = async () => {
    const response = await api.get('/encaminhamentos');

    setEncaminhamentos(response.data);
  };

  const refreshData = useCallback(() => {
    if (success) {
      getEncaminhamentos();
    }
  }, [success]);

  useEffect(() => {
    getEncaminhamentos();
    handleOpenModalProcesso();
  }, [handleOpenModalProcesso]);

  useEffect(() => {
    document.title = 'Home - B2B Juris';
    handleSetPageTitle('Início');
  }, [handleSetPageTitle]);

  useEffect(() => {
    refreshData();

    if (success) {
      setSuccess(false);
    }
  }, [refreshData, success]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DefaultBox scrollable>
        <Typography
          align="center"
          component="h1"
          variant="h4"
          className={classes.title}
        >
          Processos Encaminhados
        </Typography>

        <div className={classes.encList}>
          <List>
            {encaminhamentos.length !== 0 ? (
              encaminhamentos.map((enc, i) => (
                <ListItem
                  key={enc.id}
                  alignItems="flex-start"
                  button
                  onClick={() => handleSetSelectedEncaminhamento(i)}
                >
                  <ListItemAvatar>
                    <Badge
                      color="secondary"
                      variant="dot"
                      invisible={enc.recebido}
                    >
                      <AssignmentOutlined />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Processo Nº ${enc.processo.numero_processo}`}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <>
                        <span>Tipo: {enc.processo.tipo_processo}</span>
                        <br />
                        <span>
                          Data:{' '}
                          {new Date(
                            enc.processo.created_at
                          ).toLocaleDateString()}
                        </span>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <span>Não há processos encaminhados.</span>
            )}
          </List>
        </div>
      </DefaultBox>
      <ModalProcesso
        open={modalProcesso}
        close={handleCloseModal}
        encaminhamento={selectedEncaminhamento}
        setSuccess={setSuccessTrue}
      />
    </main>
  );
};

export default Encaminhamento;
