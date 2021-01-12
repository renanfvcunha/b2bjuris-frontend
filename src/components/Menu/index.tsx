import React, { useState, useContext } from 'react';
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
  GroupOutlined,
  Assignment,
  ExitToApp,
  Room,
} from '@material-ui/icons';

import { useStyles, Purple } from './styles';
import Routes from '../../routes';
import { AuthContext } from '../../contexts/auth';

const Menu: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { usuario, signOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

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
                Título de Teste
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
              <ListItem button selected={window.location.pathname === '/'}>
                <ListItemIcon>
                  <Home className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
            </List>
          </Link>

          <Link to="/forms" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'forms'}
              >
                <ListItemIcon>
                  <Assignment className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Formulários" />
              </ListItem>
            </List>
          </Link>

          <Link to="/groups" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'groups'}
              >
                <ListItemIcon>
                  <GroupOutlined className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Grupos" />
              </ListItem>
            </List>
          </Link>

          <Link to="/map" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'map'}
              >
                <ListItemIcon>
                  <Room className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary="Mapa" />
              </ListItem>
            </List>
          </Link>

          <Link to="/users" className={classes.link}>
            <List>
              <ListItem
                button
                selected={window.location.pathname.split('/')[1] === 'users'}
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
