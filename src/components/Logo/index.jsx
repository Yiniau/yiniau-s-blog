import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageButton from '../ImageButton'

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
    const boxStyle = {
      width: '15vw',
      margin: '5vh 0',

      backgroundColo: 'rgba(255, 255, 255, 0)',

      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }


    return (
      <div style={{
        ...boxStyle,
        ...this.props.boxStyle,
        }}>
        <ImageButton imgSrc={this.props.imgSrc}/>
        <h3
          style={{
            fontFamily: 'Indie Flower, cursive',
          }}>yiniau's blog</h3>
      </div>
    )
  }
}

export default Logo;
