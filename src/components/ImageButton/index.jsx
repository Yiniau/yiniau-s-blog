import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageButton.css'

class ImageButton extends Component {
  static propTypes = {
    style: PropTypes.object,
  }
  static defaultProps = {}

  state = {
    isOnfocus: false
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
  }

  render () {

    const roundStyle = {
      width: '90px',
      height: '90px',
      borderRadius: '100vw',
    }


    return (
      <div style={roundStyle} className="ib">
        <img src={this.props.imgSrc} onLoad={this.centerImage}/>
      </div>
    )
  }
}

export default ImageButton;
