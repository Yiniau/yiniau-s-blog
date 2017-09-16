import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';

import './NavButton.css'

class NavButton extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    iconStyle: PropTypes.object.isRequired,
    icon: PropTypes.string,
    boxStyle: PropTypes.object,
    textStyle: PropTypes.object,
    isActive: PropTypes.bool,
  };
  static defaultProps = {
    boxStyle: {},
    textStyle: {},
    isActive: false,
  };

  state = {
  };

  render () {
    const {
      id,
      to,
      boxClassName,
      boxStyle,
      textStyle,
      iconStyle,
      icon,
      content,
      isActive,
    } = this.props;
    const hasIcon = icon && typeof icon === 'string';
    return (
      <Link
        id={id}
        to={to}
        className={`nb ${boxClassName || ''}`}
        style={
          hasIcon
          ? boxStyle
          : {...boxStyle, justifyContent: 'center'}}
        onClick={this.clickHander}>

        {/* 根据是否有icon属性决定是否要生成i标签 */}
        {(() => {
            if (hasIcon) {
              return (
                <i
                  className={icon}
                  aria-hidden={"true"}
                  style={
                    isActive
                    ? {...iconStyle, transform: 'rotate(90deg)'}
                    : iconStyle
                  }>
                </i>
              )
            }
          })()}
        <h6
          style={
            hasIcon
            ? {
                fontFamily: 'Ubuntu Condensed, sans-serif',
                ...textStyle,
                marginLeft: '0',
              } : {
                fontFamily: 'Ubuntu Condensed, sans-serif',
                ...textStyle,
              }
          }>
          {content}
        </h6>
      </Link>
    )
  }
}

export default NavButton;
