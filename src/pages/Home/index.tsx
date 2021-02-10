import React, { useContext, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { PageTitleContext } from '../../contexts/pageTitleContext';
import { AuthContext } from '../../contexts/authContext';
import DefaultBox from '../../components/DefaultBox';
import useStyles from './styles';
import Encaminhamentos from '../Encaminhamentos';

const Home: React.FC = () => {
  const classes = useStyles();
  const { handleSetPageTitle } = useContext(PageTitleContext);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Home - B2B Juris';
    handleSetPageTitle('Início');
  }, [handleSetPageTitle]);

  if (usuario?.tipo_usuario === 'procurador') {
    return <Encaminhamentos />;
  }
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
          Em Construção
        </Typography>
      </DefaultBox>
    </main>
  );
};

export default Home;
