import React, { useState, useContext, useLayoutEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Home,
  Menu as MdMenu,
  ChevronLeft,
  ChevronRight,
  Group,
  ExitToApp,
  Assignment,
} from '@material-ui/icons';

import { useStyles, Purple } from './styles';
import Routes from '../../routes';
import { AuthContext } from '../../contexts/authContext';
import { PageTitleContext } from '../../contexts/pageTitleContext';

const Menu: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { usuario, signOut } = useContext(AuthContext);
  const { pageTitle } = useContext(PageTitleContext);

  const [open, setOpen] = useState(false);
  const [changePathName, setChangePathName] = useState(false);
  const [pathName, setPathName] = useState('');

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  useLayoutEffect(() => {
    setPathName(window.location.pathname.split('/')[1]);
  }, []);

  useLayoutEffect(() => {
    if (changePathName) {
      setPathName(window.location.pathname.split('/')[1]);
      setChangePathName(false);
    }
  }, [changePathName]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={Purple}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="primary"
        >
          <Toolbar className={classes.toolbarFlex}>
            <div className={classes.toolbarFlexLeft}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MdMenu />
              </IconButton>
              <Typography variant="h6" noWrap style={{ display: 'inline' }}>
                {pageTitle}
              </Typography>
            </div>
            <img
              src="/assets/images/logoUnoCollect.png"
              alt="Logo B2B Juris"
              width="50"
              height="50"
            />
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      {/** App Navigation */}
      <BrowserRouter>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div>
            <div className={classes.toolbar}>
              <span className={classes.welcome}>
                {`Olá, ${usuario?.nome.split(' ')[0]}`}
              </span>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRight className={classes.icon} />
                ) : (
                  <ChevronLeft className={classes.icon} />
                )}
              </IconButton>
            </div>
          </div>

          <Divider />

          <Link to="/" className={classes.link}>
            <List>
              <ListItem
                button
                onClick={() => setChangePathName(true)}
                selected={pathName === ''}
              >
                <ListItemIcon>
                  <Home className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
            </List>
          </Link>

          <Link to="/processos" className={classes.link}>
            <List>
              <ListItem
                button
                onClick={() => setChangePathName(true)}
                selected={pathName === 'processos'}
              >
                <ListItemIcon>
                  <Assignment className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Processos" />
              </ListItem>
            </List>
          </Link>

          <Link to="/usuarios" className={classes.link}>
            <List>
              <ListItem
                button
                onClick={() => setChangePathName(true)}
                selected={pathName === 'usuarios'}
              >
                <ListItemIcon>
                  <Group className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </List>
          </Link>

          <Divider />

          <List>
            <ListItem button onClick={signOut}>
              <ListItemIcon>
                <ExitToApp className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Drawer>

        {/** App Routes */}
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default Menu;
