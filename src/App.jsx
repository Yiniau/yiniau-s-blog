import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {
  Blog
} from './views/index.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/blog'/>
        <Route path='/blog' component={Blog}/>
      </Switch>
    );
  }
}

export default App;
