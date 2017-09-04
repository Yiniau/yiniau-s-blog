import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  Blog
} from './views/index.js';

class App extends Component {
  render() {

    return (
      <div>
        <Redirect from='/' to='/blog'/>
        <Route path='/blog' component={Blog}/>
      </div>
    );
  }
}

export default App;
