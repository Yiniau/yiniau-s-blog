import React from 'react';

const MainContent = (props) => {
  const style = {
    width: '100%',
    minHeight: '100vh',
    padding: '5px',

    backgroundColor: 'rgb(208, 208, 208)',

    ...props.style,
  }
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

export default MainContent;
