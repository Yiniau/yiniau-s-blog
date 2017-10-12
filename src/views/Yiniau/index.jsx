import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// import css
import './yiniau.css';

class Yiniau extends Component {
  static propTypes = {}
  static defaultProps = {}

  state = {}

  render () {
    return (
      <div className='Yiniau'>
        <canvas className='draw_bg'></canvas>
        <canvas className='draw_fe'></canvas>
      </div>
    )
  }
}

export default Yiniau;
