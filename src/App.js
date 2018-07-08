import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Select from 'pages/Select';
import Chase from 'pages/Chase';

import { hot } from 'react-hot-loader';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/select" exact={true} component={Select} />
          <Route path="/chase" exact={true} component={Chase} />
          <Redirect to="/select" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
