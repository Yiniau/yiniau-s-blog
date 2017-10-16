import React from 'react';

import './mainContent.css'

const MainContent = (props) => {
  const style = {

    ...props.style,
  }
  return (
    <div
      className='blog_mainContent'
      style={style}>
      {props.children}
    </div>
  )
}

export default MainContent;
