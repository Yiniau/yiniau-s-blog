import React, { Component } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import {
  Blog
} from './views/index.js';

class App extends Component {
  render() {
    return (
      <div>
        <Redirect exact from='/' to='/blog'/>
        <Route path='/blog' component={Blog}/>
      </div>
    );
  }
}

export default App;
