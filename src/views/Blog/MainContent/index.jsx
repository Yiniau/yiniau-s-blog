import React from 'react';

const MainContent = (props) => {
  const style = {
    width: '85vw',
    minHeight: '100vh',

    boxSize: 'border-box',

    ...props.style,
  }
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export default MainContent;
