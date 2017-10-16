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
    boxClassName: PropTypes.string,
    textStyle: PropTypes.object,
    shadowStyle: PropTypes.string,
    isActive: PropTypes.bool,
  };
  static defaultProps = {
    boxStyle: {},
    textStyle: {},
    activeStyle: {
      backgroundColor: 'rgba(62, 195, 255, 0.5)',
      boxShadow: '0 1px 6px #00b2ff, 0 1px 4px #00b2ff',
    },
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
      activeStyle,
      iconStyle,
      icon,
      content,
      isActive,
    } = this.props;

    const getLinkBtnSytle = (hasi, isa) => {
      return (
        hasi
        ? isa
          ? {
            ...boxStyle,
            ...activeStyle,
          } : boxStyle
        : isa
          ? {
            ...boxStyle,
            ...activeStyle,
            justifyContent: 'center',
          } : {
            ...boxStyle,
            justifyContent: 'center',
          }
      )
    };

    const hasIcon = icon && typeof icon === 'string';
    // TODO: replace <Link></Link> to <NavLink><NavLink/>
    return (
      <Link
        id={id}
        to={to}
        className={`nb ${boxClassName || ''}`}
        style={getLinkBtnSytle(hasIcon, isActive)}>

        {/* 根据是否有icon属性决定是否要生成i标签 */}
        {(() => {
            if (hasIcon) {
              return (
                <i
                  className={icon}
                  aria-hidden={"true"}
                  style={
                    isActive
                    ? {
                      ...iconStyle,
                      transform: 'rotate(90deg)',
                    } : iconStyle
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
