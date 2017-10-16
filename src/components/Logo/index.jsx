import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageButton from '../ImageButton';

import './logo.css';

class Logo extends Component {

  static propTypes = {
    boxStyle: PropTypes.object,
    imgSrc: PropTypes.string.isRequired,
  }
  static defaultProps = {
    boxStyle: {}
  }

  state = {
    isOnfocus: false
  }

  render () {
    const {
      className,
      boxStyle,
      imgSrc,
    } = this.props;

    return (
      <div
        className={`blog_logo ${className || ''}`}
        style={{
          ...boxStyle,
        }}>
        <ImageButton imgSrc={imgSrc}/>
        <h3
          style={{
            fontFamily: 'Indie Flower, cursive',
          }}>yiniau's blog</h3>
      </div>
    )
  }
}

export default Logo;
