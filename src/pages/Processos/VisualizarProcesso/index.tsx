import React from 'react';

import useStyles from './styles';
import DefaultBox from '../../../components/DefaultBox';

const VisualizarProcesso: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <DefaultBox>
        <h1>Teste</h1>
      </DefaultBox>
    </main>
  );
};

export default VisualizarProcesso;
