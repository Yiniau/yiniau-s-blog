import React, { Component } from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {
  Blog,
  Yiniau,
} from './views/index.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/blog'/>
        <Route path='/blog' component={Blog}/>
        <Route path='/yiniau' component={Yiniau}/>
      </Switch>
    );
  }
}

export default App;
