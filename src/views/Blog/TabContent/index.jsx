import React from 'react';

import './tabContent.css';

const TabContent = (props) => {
  const {
    boxStyle,
  } = props;
  return (
    <div
      style={boxStyle}
      className="blog_sidebar_tagContainer deep-2">
      {props.children}
      <div
        className="blog_sidebar_tagContainer_items">
        <button className="fa fa-weixin fa-lg iconButton" disabled></button>
        <button className="fa fa-qq fa-lg iconButton" disabled></button>
        <button className="fa fa-envelope fa-lg iconButton" disabled></button>
      </div>
    </div>
  )
}

export default TabContent;
