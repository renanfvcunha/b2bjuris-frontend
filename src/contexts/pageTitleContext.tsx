import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

interface PageTitleContextData {
  pageTitle: string;
  handleSetPageTitle(title: string): void;
}

export const PageTitleContext = createContext<PageTitleContextData>(
  {} as PageTitleContextData
);

const PageTitleProvider: React.FC = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');

  const handleSetPageTitle = (title: string) => {
    setPageTitle(title);
  };

  return (
    <PageTitleContext.Provider
      value={{
        pageTitle,
        handleSetPageTitle,
      }}
    >
      {children}
    </PageTitleContext.Provider>
  );
};

PageTitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitleProvider;
