import React from 'react';

// 侧边栏
const SideBar = (props) => {
  const style = {
    width: '15vw',
    minHeight: '100vh',
    backgroundColor: 'rgb(255, 255, 255)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',

    ...props.style,
  }

  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  )
}

export default SideBar;
