import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

interface ProcessoContextData {
  /* pageTitle: string;
  handleSetPageTitle(title: string): void; */
}

export const PageTitleContext = createContext<ProcessoContextData>(
  {} as ProcessoContextData
);

const ProcessoProvider: React.FC = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');

  const handleSetPageTitle = (title: string) => {
    setPageTitle(title);
  };

  return (
    <PageTitleContext.Provider value={{}}>{children}</PageTitleContext.Provider>
  );
};

ProcessoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProcessoProvider;
