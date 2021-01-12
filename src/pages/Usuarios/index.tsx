import React from 'react';
import useStyles from './styles';

const Usuarios: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Página de Usuários</h1>
    </main>
  );
};

export default Usuarios;
