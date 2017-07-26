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
    icon: PropTypes.string.isRequired,
    textStyle: PropTypes.object,
  }
  static defaultProps = {
    icon: 'fa fa-hand-o-right',
    textStyle: {},
  }

  state = {}

  render () {
    const {
      to,
      boxClassName,
      boxStyle,
      textStyle,
      iconStyle,
      icon,
      content,
      ...rest
    } = this.props;
    return (
      <Link to={to} className={`nb ${boxClassName || ''}`} {...rest}>
        <i className={icon} aria-hidden="true" style={iconStyle}></i>
        <h6 style={textStyle}>
          {content}
        </h6>
      </Link>
    )
  }
}

export default NavButton;
