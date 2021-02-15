import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import HeaderAppBar from './components/HeaderAppBar';
import MenuComponent from './components/Menu';

import HomeView from './views/Home';
import SQLView from './views/OnlineSQL';

import { initializeIcons } from '@fluentui/react/lib/Icons';
initializeIcons('https://static2.sharepointonline.com/files/fabric/assets/icons/');

function App() {
  const [stateMenu, setStateMenu] = useState('close')

  const ActionMenu = () => {
    if (stateMenu === '') {
      setStateMenu('close');
    } else {
      setStateMenu('');
    }
  }
  return (
    <BrowserRouter>
      <HeaderAppBar ActionMenu={ActionMenu} />
      <Grid item className={`asideSYS ${stateMenu}`}>
        <MenuComponent stateMenu={stateMenu} />
      </Grid>
      <Grid item className="mainSYS">
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route exact path="/sql">
            <SQLView />
          </Route>
        </Switch>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
