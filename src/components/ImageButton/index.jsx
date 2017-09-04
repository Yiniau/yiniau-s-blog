import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageButton.css'

class ImageButton extends Component {
  static propTypes = {
    style: PropTypes.object,
  }
  static defaultProps = {}

  state = {
    isOnfocus: false,

  }

  centerImage = (e) => {
    e.persist(); // 异步事件

    const img = e.target;
    const { width, height, parentNode } = img;
    const { pWidth, pHeight } = {
      // 可视宽高
      pWidth: parentNode.offsetWidth,
      pHeight: parentNode.offsetHeight,
    };

    img.style.left = `${- (width - pWidth)/2}px`;
    img.style.top = `${- (height - pHeight)/2}px`;

    return;
  }

  fouceChange = () => this.setState({
    isOnfocus: !this.state.isOnfocus,
  });


  render () {

    const roundStyle = {
      width: '90px',
      height: '90px',
      borderRadius: '100vw',
      transition: 'all 0.5s ease-in-out',
    }

    const {
      isOnfocus
    } = this.state;

    return (
      <div
        style={roundStyle}
        className={`ib ${isOnfocus ? 'deep-3' : 'deep-2'}`}
        onMouseEnter={this.fouceChange}
        onMouseLeave={this.fouceChange}
        >
        <img src={this.props.imgSrc} onLoad={this.centerImage} alt=""/>
      </div>
    )
  }
}

export default ImageButton;
