import React, { useContext, useEffect } from 'react';

import { PageTitleContext } from '../../contexts/pageTitleContext';
import useStyles from './styles';

const Home: React.FC = () => {
  const classes = useStyles();
  const { handleSetPageTitle } = useContext(PageTitleContext);

  useEffect(() => {
    document.title = 'Home - B2B Juris';
    handleSetPageTitle('Início');
  }, [handleSetPageTitle]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Página em construção.</h1>
    </main>
  );
};

export default Home;
