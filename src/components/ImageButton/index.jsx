import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageButton.css'

class ImageButton extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  static defaultProps = {
    style: {}
  }

  state = {
    isOnfocus: false,
  }

  /**
   * 将图片中心移动到元素的中心
   * @method centerImage
   * @param  {SyntheticEvent}    e  React 合成事件实例
   * @return {object}               null
   */
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

  /**
   * 判断是否获得焦点
   * @method fouceChange
   * @return {null}   null;
   */
  fouceChange = () => this.setState({
    isOnfocus: !this.state.isOnfocus,
  });

  render () {
    const {
      isOnfocus
    } = this.state;

    return (
      <div
        style={this.props.style}
        className={`ib ${isOnfocus ? 'deep-3' : 'deep-2'}`}
        onMouseEnter={this.fouceChange}
        onMouseLeave={this.fouceChange}>
        <img src={this.props.imgSrc} onLoad={this.centerImage} alt=""/>
      </div>
    )
  }
}

export default ImageButton;
